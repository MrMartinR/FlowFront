import { createSlice } from '@reduxjs/toolkit'

const initialOriginatorsState = {
  loading: false,
  originatorsTable: [],
  error: null as any,
}

export const originatorsSlice = createSlice({
  name: 'platforms',
  initialState: initialOriginatorsState,
  reducers: {
    startCall: (state) => {
      state.loading = true
    },
    originatorsReceived: (state, action) => {
      state.loading = false
      state.originatorsTable = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
  },
})

export const { startCall, originatorsReceived, catchError } = originatorsSlice.actions
