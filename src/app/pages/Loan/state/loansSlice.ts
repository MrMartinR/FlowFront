import { createSlice } from '@reduxjs/toolkit'

const initialLoansState = {
  loading: false,
  loansData: [],
  loanDetails: [],
  error: null as any,
  success: null as any,
}

export const loansSlice = createSlice({
  name: 'loans',
  initialState: initialLoansState,
  reducers: {
    startCall: (state) => {
      state.loading = true
      state.success = null
    },
    loansReceived: (state, action) => {
      state.loading = false
      state.loansData = action.payload.data
    },
    loanDetailsReceived: (state, action) => {
      state.loading = false
      state.loanDetails = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.success = false
      state.error = `${action.type}: ${action.payload.error}`
    },
    loansResetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success
    },
  },
})
