import { createSlice } from '@reduxjs/toolkit'

const initialPlatformsState = {
  loading: false,
  platformsTable: [],
  platformDetails: {},
  platformOriginators: [],
  platformLoans: [],
  error: null as any,
  success: null as any,
  message: null as any,
}

export const platformsSlice = createSlice({
  name: 'platforms',
  initialState: initialPlatformsState,
  reducers: {
    startCall: (state) => {
      state.loading = true
      state.success = null
      state.message = null
    },
    platformsReceived: (state, action) => {
      state.platformsTable = action.payload.data
      state.loading = false
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.platformOriginators = []
      state.loading = false
      state.success = false
    },
    platformDetailsReceived: (state, action) => {
      state.platformDetails = action.payload.data
      state.loading = false
    },
    platformOriginatorsReceived: (state, action) => {
      state.platformOriginators = action.payload.data
      state.loading = false
    },
    platformLoansReceived: (state, action) => {
      state.platformLoans = action.payload.data
      state.loading = false
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
  },
})