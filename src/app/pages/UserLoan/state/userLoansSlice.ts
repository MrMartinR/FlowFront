import { createSlice } from '@reduxjs/toolkit'

const initialUserLoansState = {
  loading: false,
  userLoansData: [],
  userLoanDetails: [],
  error: null as any,
}

export const userLoansSlice = createSlice({
  name: 'userLoans',
  initialState: initialUserLoansState,
  reducers: {
    startCall: (state) => {
      state.loading = true
    },
    userLoansReceived: (state, action) => {
      state.loading = false
      state.userLoansData = action.payload.data
    },
    userLoanDetailsReceived: (state, action) => {
      state.loading = false
      state.userLoanDetails = action.payload.message[0]
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
  },
})

export const { startCall, userLoansReceived, userLoanDetailsReceived, catchError } = userLoansSlice.actions
