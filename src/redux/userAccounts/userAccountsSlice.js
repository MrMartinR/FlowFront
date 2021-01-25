import { createSlice } from '@reduxjs/toolkit'
import Util from '../../app/utils'

const initialUserAccountsState = {
  listLoading: true,
  actionsLoading: false,
  userAccountTable: {
    entities: null,
    page: null,
    pages: null,
    perPage: null
  },
  userAccountForEdit: undefined,
  lastError: null
}
export const callTypes = {
  list: 'list',
  action: 'action'
}
export const userAccountsSlice = createSlice({
  name: 'userAccounts',
  initialState: initialUserAccountsState,
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
    userAccountSort: (state, action) => {
      const { field, isAsc, entities } = action.payload
      const areEmptyFields = entities.some((i) => i[field])
      if (areEmptyFields) {
        const entitiesOrdened = [...entities].sort(Util.sortCustom(field, isAsc, (a) => a.toUpperCase()))
        state.accountTable.entities = entitiesOrdened
      }
    },
    // getCustomerById
    userAccountFetched: (state, action) => {
      state.actionsLoading = false
      state.userAccountForEdit = action.payload.userAccountForEdit
      state.error = null
    },
    // findCustomers
    userAccountsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.userAccountTable.data = data.data
      state.userAccountTable.success = data.success
    },
    // findNewCustomers
    userAccountsAppend: (state, action) => {
      const { pages, page, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.userAccountTable.entities = [...state.userAccountTable.entities, ...entities]
      state.userAccountTable.pages = pages
      state.userAccountTable.page = page
    },
    // createCustomer
    userAccountCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.userAccountTable.entities.push(action.payload.userAccount)
    },
    // updateCustomer
    userAccountUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.userAccountTable.entities = state.userAccountTable.entities.map((entity) => {
        if (entity.id === action.payload.userAccount.id) {
          return action.payload.userAccount
        }
        return entity
      })
    },
    // deleteCustomer
    userAccountDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.userAccountTable.entities = state.userAccountTable.entities.filter((el) => el.id !== action.payload.id)
    },
    // deleteCustomers
    userAccountsDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.userAccountTable.entities = state.userAccountTable.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      )
    },
    // userAccountsUpdateState
    userAccountsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.userAccountTable.entities = state.userAccountTable.entities.map((entity) => {
        if (ids.findIndex((id) => id === entity.id) > -1) {
          entity.status = status
        }
        return entity
      })
    },
    // userAccountTransactions
    userAccountTransactions: (state, action) => {
      state.actionsLoading = false
      state.userAccountTransactions = action.payload.userAccountTransactions
      state.error = null
    }
  }
})
