import { createSlice } from '@reduxjs/toolkit'

const initialCurrenciesState = {
  listLoading: true,
  actionsLoading: false,
  currenciesTable: {
    entities: null as any,
  },
  singleCurrency: {} as any,
  success: null as any,
  error: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const currenciesSlice = createSlice({
  name: 'currencies',

  initialState: initialCurrenciesState,
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

    // update the currency state on all fetch
    currenciesFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.currenciesTable.entities = data
    },

    // update the currency state on fetch a single currency
    currencyFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.singleCurrency = data
    },

    // on creation a new currency append it to existing currencies
    currencyCreated: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.success = true
      state.currenciesTable.entities.unshift(data)
    },
    // Update Crrency
    currencyUpdated: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.success = true
      let newState = [] as any
      state.currenciesTable.entities.map((o: any) => {
          if (o.id !== data.id) {
          newState.push(o)
          } else newState.push(data)
          return newState;
      })
      state.currenciesTable.entities = newState
    },
    // Delete Currency
    currencyDeleted: (state, action) => {
      const { itm, success, message } = action.payload
      let newState = [] as any
      state.currenciesTable.entities.map((o: any) => {
          if (o.id !== itm) {
          newState.push(o)
          }
          return newState;
      })
      state.currenciesTable.entities = newState
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
