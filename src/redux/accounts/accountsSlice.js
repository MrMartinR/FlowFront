import { createSlice } from '@reduxjs/toolkit'
import Util from '../../app/utils'

const initialAccountsState = {
  listLoading: true,
  actionsLoading: false,
  accountTable: {
    entities: null, page: null, pages: null, perPage: null,
  },
  accountForEdit: undefined,
  lastError: null,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: initialAccountsState,
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
    accountSort: (state, action) => {
      const { field, isAsc, entities } = action.payload
      const areEmptyFields = entities.some((i) => i[field])
      if (areEmptyFields) {
        const entitiesOrdened = [...entities].sort(
          Util.sortCustom(field, isAsc, (a) => a.toUpperCase()),
        )
        state.accountTable.entities = entitiesOrdened
      }
    },
    // getCustomerById
    accountFetched: (state, action) => {
      state.actionsLoading = false
      state.accountForEdit = action.payload.accountForEdit
      state.error = null
    },
    // findCustomers
    accountsFetched: (state, action) => {
      const { pages, page, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.accountTable.entities = entities
      state.accountTable.pages = pages
      state.accountTable.page = page
    },
    // findNewCustomers
    accountsAppend: (state, action) => {
      const { pages, page, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.accountTable.entities = [
        ...state.accountTable.entities,
        ...entities,
      ]
      state.accountTable.pages = pages
      state.accountTable.page = page
    },
    // createCustomer
    accountCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.accountTable.entities.push(action.payload.account)
    },
    // updateCustomer
    accountUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountTable.entities = state.accountTable.entities.map(
        (entity) => {
          if (entity.id === action.payload.account.id) {
            return action.payload.account
          }
          return entity
        },
      )
    },
    // deleteCustomer
    accountDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountTable.entities = state.accountTable.entities.filter(
        (el) => el.id !== action.payload.id,
      )
    },
    // deleteCustomers
    accountsDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountTable.entities = state.accountTable.entities.filter(
        (el) => !action.payload.ids.includes(el.id),
      )
    },
    // accountsUpdateState
    accountsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.accountTable.entities = state.accountTable.entities.map(
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
