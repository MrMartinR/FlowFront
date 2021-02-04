import { createSlice } from '@reduxjs/toolkit'

const initialLoansState = {
  loading: false,
  loansData: [],
  error: null as any,
}

export const loansSlice = createSlice({
  name: 'loans',
  initialState: initialLoansState,
  reducers: {
    startCall: (state) => {
      state.loading = true
    },
    loansReceived: (state, action) => {
      state.loading = false
      state.loansData = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
  },
})

export const { startCall, loansReceived, catchError } = loansSlice.actions
