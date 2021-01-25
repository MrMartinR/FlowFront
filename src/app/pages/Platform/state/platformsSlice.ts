import { createSlice } from '@reduxjs/toolkit'

const initialPlatformsState = {
  loading: false,
  platformsTable: [],
  error: null as any
}

export const platformsSlice = createSlice({
  name: 'platforms',
  initialState: initialPlatformsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    platformsReceived: (state, action) => {
      state.loading = false
      state.platformsTable = action.payload.data
    },
    catchError: (state, action) => {
      // state.loading = false,
      state.error = `${action.type}: ${action.payload.error}`
    }
  }
})

export const { startCall, platformsReceived, catchError } = platformsSlice.actions
