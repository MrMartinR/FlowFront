import { createSlice } from '@reduxjs/toolkit'

const initialUserLoansState = {
  loading: false,
  userLoansData: [],
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
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
  },
})

export const { startCall, userLoansReceived, catchError } = userLoansSlice.actions
