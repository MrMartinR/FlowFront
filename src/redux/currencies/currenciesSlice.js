import { createSlice } from '@reduxjs/toolkit'
import Util from '../../app/utils'

const initialCurrenciesState = {
  listLoading: false,
  actionsLoading: false,
  currencyTable: {
    entities: null, page: null, pages: null, perPage: null,
  },
  currencyForEdit: undefined,
  lastError: null,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: initialCurrenciesState,
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
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    currencySort: (state, action) => {
      const { field, isAsc, entities } = action.payload
      const areEmptyFields = entities.some((i) => i[field])
      if (areEmptyFields) {
        const entitiesOrdened = [...entities].sort(
          Util.sortCustom(field, isAsc, (a) => a.toUpperCase()),
        )
        state.currencyTable.entities = entitiesOrdened
      }
    },
    // getCustomerById
    currencyFetched: (state, action) => {
      state.actionsLoading = false
      state.currencyForEdit = action.payload.currencyForEdit
      state.error = null
    },
    // findCustomers
    currenciesFetched: (state, action) => {
      const { pages, page, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.currencyTable.entities = entities
      state.currencyTable.pages = pages
      state.currencyTable.page = page
    },
    // createCustomer
    currencyCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.currencyTable.entities.push(action.payload.currency)
    },
    // updateCustomer
    currencyUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.currencyTable.entities = state.currencyTable.entities.map(
        (entity) => {
          if (entity.id === action.payload.currency.id) {
            return action.payload.currency
          }
          return entity
        },
      )
    },
    // deleteCustomer
    currencyDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.currencyTable.entities = state.currencyTable.entities.filter(
        (el) => el.id !== action.payload.id,
      )
    },
    // deleteCustomers
    currenciesDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.currencyTable.entities = state.currencyTable.entities.filter(
        (el) => !action.payload.ids.includes(el.id),
      )
    },
    // CurrenciesUpdateState
    currenciesStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.currencyTable.entities = state.currencyTable.entities.map(
        (entity) => {
          if (ids.findIndex((id) => id === entity.id) > -1) {
            entity.status = status
          }
          return entity
        },
      )
    },
  },
})
