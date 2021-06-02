import { createSlice } from '@reduxjs/toolkit'

const initialOriginatorsState = {
  loading: false,
  originatorsTable: [],
  originatorDetails: {},
  originatorLoans: [],
  error: null as any,
  success: null as any,
  message: null as any,
}

export const originatorsSlice = createSlice({
  name: 'originators',
  initialState: initialOriginatorsState,
  reducers: {
    startCall: (state) => {
      state.loading = true
      state.success = null
      state.message = null
    },
    originatorsReceived: (state, action) => {
      state.loading = false
      state.originatorsTable = action.payload.data
    },
    originatorDetailsReceived: (state, action) => {
      state.originatorDetails = action.payload.data
      state.loading = false
    },
    catchError: (state, action) => {
      state.loading = false
      state.success = false
      state.error = `${action.type}: ${action.payload.error}`
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
    originatorLoansReceived: (state, action) => {
      state.originatorLoans = action.payload.data
      state.loading = false
    },
  },
})
