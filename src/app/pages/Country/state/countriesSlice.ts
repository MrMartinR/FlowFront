import { createSlice } from '@reduxjs/toolkit'
import sortCustom from '../../../utils'

interface initialState {
  listLoading: boolean
  actionsLoading: boolean
  countryTable: {
    entities: any[]
    page: number
    pages: number
    perPage: number
  }
  countryForEdit: undefined
  error: string
}

const initialCountriesState: initialState = {
  listLoading: true,
  actionsLoading: false,
  countryTable: {
    entities: [],
    page: 0,
    pages: 0,
    perPage: 0,
  },
  countryForEdit: undefined,
  error: '',
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: initialCountriesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = ''
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    // countrySort: (state, action) => {
    //   const { field, isAsc, entities } = action.payload
    //   const areEmptyFields = entities.some((i: any) => i[field])
    //   if (areEmptyFields) {
    //     const entitiesOrdened = [...entities].sort(sortCustom(field, isAsc, (a: any, b: any) => a.toUpperCase()))
    //     state.countryTable.entities = entitiesOrdened
    //   }
    // },

    // getCustomerById
    countryFetched: (state, action) => {
      console.log('ACTION: ', action)
      state.actionsLoading = false
      state.countryForEdit = action.payload.countryForEdit
      state.error = ''
    },
    // findCustomers
    countriesFetched: (state, action) => {
      const { entities } = action.payload
      state.listLoading = false
      state.error = ''
      state.countryTable.entities = entities
    },
    // createCustomer
    countryCreated: (state, action) => {
      state.actionsLoading = false
      state.error = ''
      state.countryTable.entities.push(action.payload.country)
    },
    // updateCustomer
    countryUpdated: (state, action) => {
      state.error = ''
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.map((entity: any) => {
        if (entity.id === action.payload.country.id) {
          return action.payload.country
        }
        return entity
      })
    },
    // deleteCustomer
    countryDeleted: (state, action) => {
      state.error = ''
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.filter((el: any) => el.id !== action.payload.id)
    },
    // deleteCustomers
    countriesDeleted: (state, action) => {
      state.error = ''
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.filter((el: any) => !action.payload.ids.includes(el.id))
    },
    // CountriesUpdateState
    countriesStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = ''
      const { ids, status } = action.payload
      state.countryTable.entities = state.countryTable.entities.map((entity: any) => {
        if (ids.findIndex((id: any) => id === entity.id) > -1) {
          entity.status = status
        }
        return entity
      })
    },
  },
})
