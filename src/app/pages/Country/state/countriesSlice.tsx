import { createSlice } from '@reduxjs/toolkit'

const initialCountriesState = {
    listLoading: true,
    actionsLoading: false,
    countryTable: {
        entities: [] as any,
      },
    singleCountry: {},
    error: null as any,
    success: null as any,
    message: null as any,
  }
  export const callTypes = {
    list: 'list',
    action: 'action',
  }
  export const countriesSlice = createSlice({
    name: 'countries',
    initialState: initialCountriesState,
    reducers: {
        // when error occurs catch it
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`
            state.success = false
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false
            } else {
            state.actionsLoading = false
            }
        },
        // set the state in which the process is in loading or setting the state
        startCall: (state, action) => {
            state.error = null
            state.success = null
            state.message = null
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true
            } else {
                state.actionsLoading = true
            }
        },
        // update the country state on all fetch
        countriesFetched: (state, action) => {
            const { data } = action.payload
            state.listLoading = false
            state.countryTable.entities = data
        },
        // update the country state on fetch a single country
        countryFetched: (state, action) => {
            const { data } = action.payload
            state.actionsLoading = false
            state.singleCountry = data
        },
        // create new Country
        countryCreated: (state, action) => {
            const { data } = action.payload
            state.actionsLoading = false
            state.success = true
            state.countryTable.entities.unshift(data)
        },
        // Update Country
        countryUpdated: (state, action) => {
            const { data } = action.payload
            state.actionsLoading = false
            state.success = true
            let newState = [] as any
            state.countryTable.entities.map((o: any) => {
                if (o.id !== data.id) {
                newState.push(o)
                } else newState.push(data)
                return newState;
            })
            state.countryTable.entities = newState
        },
        // Delete Country
        countryDeleted: (state, action) => {
            const { itm, success, message } = action.payload
            let newState = [] as any
            state.countryTable.entities.map((o: any) => {
                if (o.id !== itm) {
                newState.push(o)
                }
                return newState;
            })
            state.countryTable.entities = newState
            state.success = success
            state.message = message
            state.actionsLoading = false
        },
        resetSuccess: (state, action) => {
            const { success } = action.payload
            state.success = success;
            state.message = null;
          },
    },
})


