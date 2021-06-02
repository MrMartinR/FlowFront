import { createSlice } from '@reduxjs/toolkit'

const initialAccountsState = {
  listLoading: true,
  actionsLoading: false,
  accountsTable: {
    entities: null as any,
  },
  singleAccount: {
    entry: null as any,
  },
  success: null as any,
  error: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const accountsSlice = createSlice({
  name: 'accounts',

  initialState: initialAccountsState,
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

    // update the account state on all fetch
    accountsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.accountsTable.entities = data
    },

    // update the account state on fetch a single account
    accountFetched: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.singleAccount.entry = data
    },

    // createAccount
    accountCreated: (state, action) => {
      const { data } = action.payload
      state.accountsTable.entities.unshift(data)
      state.success = true
      state.actionsLoading = false
    },

    // updateAccount
    accountUpdated: (state, action) => {
      const { data } = action.payload
      let newState = [] as any
      state.accountsTable.entities.map((o: any) => {
        if (o.id !== data.id) {
          newState.push(o)
        } else newState.push(data)
        return newState;
      })
      
      state.actionsLoading = false
      state.accountsTable.entities = newState
      state.success = true
    },

    // deleteAccount
    accountDeleted: (state, action) => {
      const { itm, success, message } = action.payload
      let newState = [] as any
      state.accountsTable.entities.map((o: any) => {
        if (o.id !== itm) {
          newState.push(o)
        }
        return newState;
      })
      state.actionsLoading = false
      state.accountsTable.entities = newState
      state.success = success
      state.message = message
    },
    // accountsUpdateState
    accountsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.accountsTable.entities = state.accountsTable.entities.map((entity: any) => {
        if (ids.findIndex((id: any) => id === entity.id) > -1) {
          entity.status = status
        }
        return entity
      })
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
  },
})
