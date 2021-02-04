import { createSlice } from '@reduxjs/toolkit'

const initialUserLoansState = {
  loading: false,
  loansData: [],
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
      state.loansData = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
  },
})

export const { startCall, userLoansReceived, catchError } = userLoansSlice.actions
