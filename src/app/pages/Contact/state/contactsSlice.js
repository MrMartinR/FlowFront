import { createSlice } from "@reduxjs/toolkit"
import Util from "../../../utils"

const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactsTable: { entities: null, page: null, pages: null, perPage: null },
  contactForEdit: undefined,
  lastError: null,
}
export const callTypes = {
  list: "list",
  action: "action",
}
export const contactsSlice = createSlice({
  // [REV] not working if I change the name to contacts
  // name: 'contacts',
  name: "userAccounts",

  initialState: initialContactsState,
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
        const entitiesOrdened = [...entities].sort(
          Util.sortCustom(field, isAsc, (a) => a.toUpperCase())
        )
        state.accountTable.entities = entitiesOrdened
      }
    },

    userAccountFetched: (state, action) => {
      state.actionsLoading = false
      state.contactForEdit = action.payload.contactForEdit
      state.error = null
    },

    userAccountsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.contactsTable.data = data.data
      state.contactsTable.success = data.success
    },

    userAccountsAppend: (state, action) => {
      const { pages, page, entities } = action.payload
      state.listLoading = false
      state.error = null
      state.contactsTable.entities = [
        ...state.contactsTable.entities,
        ...entities,
      ]
      state.contactsTable.pages = pages
      state.contactsTable.page = page
    },

    userAccountCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.contactsTable.entities.push(action.payload.userAccount)
    },

    userAccountUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.contactsTable.entities = state.contactsTable.entities.map(
        (entity) => {
          if (entity.id === action.payload.userAccount.id) {
            return action.payload.userAccount
          }
          return entity
        }
      )
    },

    userAccountDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.contactsTable.entities = state.contactsTable.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },

    userAccountsDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.contactsTable.entities = state.contactsTable.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      )
    },

    userAccountsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.contactsTable.entities = state.contactsTable.entities.map(
        (entity) => {
          if (ids.findIndex((id) => id === entity.id) > -1) {
            entity.status = status
          }
          return entity
        }
      )
    },
  },
})
