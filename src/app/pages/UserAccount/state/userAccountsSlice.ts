import { createSlice } from '@reduxjs/toolkit'

const initialUserAccountsState = {
  listLoading: false,
  actionsLoading: false,
  userAccountsTable: [],
  userAccountsDetails: {},
  userAccountsTransactions: null as any,
  error: null as any,
  success: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const userAccountsSlice = createSlice({
  name: 'user-accounts',
  initialState: initialUserAccountsState,
  reducers: {
    startCall: (state, action) => {
      state.success = null
      state.error = null
      state.message = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    userAccountsReceived: (state, action) => {
      const { data } = action.payload
      state.userAccountsTable = data
      state.listLoading = false
    },
    userAccountReceived: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.userAccountsDetails = data
    },

    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.success = false
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    userAccountsResetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success
    },
    userAccountTransactions: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.userAccountsTransactions = data
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
    transactionCreate: (state, action) => {
      const { data } = action.payload
      state.listLoading=false
      const newState = state.userAccountsTransactions
      newState.unshift(data)
    },
  },
})
