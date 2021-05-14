import { createSlice } from '@reduxjs/toolkit'

const initialUserLoansState = {
  loading: false,
  userLoansData: [],
  userLoanDetails: {},
  error: null as any,
  success: null as any,
}

export const userLoansSlice = createSlice({
  name: 'userLoans',
  initialState: initialUserLoansState,
  reducers: {
    startCall: (state) => {
      state.loading = true
      state.success = null
    },
    userLoansReceived: (state, action) => {
      state.loading = false
      state.userLoansData = action.payload.data
    },
    userLoanDetailsReceived: (state, action) => {
      state.loading = false
      state.userLoanDetails = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.success = false
      state.error = `${action.type}: ${action.payload.message}`
    },
    userLoansResetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success
    },
  },
})

export const { startCall, userLoansReceived, userLoanDetailsReceived, catchError } = userLoansSlice.actions
