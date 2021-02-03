import { createSlice } from '@reduxjs/toolkit'

const initialAccountsState = {
  listLoading: true,
  actionsLoading: false,
  accountsTable: {
    entities: null as any,
    success: false,
  },
  singleAccount: {
    entry: null as any,
  },
  accountForEdit: undefined,
  error: null as any,
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
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    // set the state in which the process is in loading or setting the state
    startCall: (state, action) => {
      state.error = null
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
      state.error = null
      state.accountsTable.entities = data.data
      state.accountsTable.success = data.success
    },

    // update the contact state on fetch a single contact
    accountFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.singleAccount.entry = data.data
      state.accountsTable.success = data.success
    },

    // on creation a new contact append it to existing contacts
    // newContactCreated: (state, action) => {
    //   const { data } = action.payload
    //   state.actionsLoading = false
    //   state.error = null
    //   state.accountsTable.entities.unshift(data.data)
    // },
  },
})
