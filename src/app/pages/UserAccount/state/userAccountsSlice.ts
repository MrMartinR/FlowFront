import { createSlice } from '@reduxjs/toolkit'

const initialUserAccountsState = {
  loading: false,
  userAccountsTable: [],
  error: null as any,
}

export const userAccountsSlice = createSlice({
  name: 'user-accounts',
  initialState: initialUserAccountsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    userAccountsReceived: (state, action) => {
      state.userAccountsTable = action.payload.data
      state.loading = false
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.loading = false
    },
 


  },
})

export const {
  startCall,
  userAccountsReceived,
  catchError,
} = userAccountsSlice.actions
