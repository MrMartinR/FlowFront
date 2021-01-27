import { createSlice } from '@reduxjs/toolkit'

const initialUserPlatformsState = {
  loading: false,
  userPlatformsTable: [],
  userPlatformDetails: [],
  error: null as any,
}

export const userPlatformsSlice = createSlice({
  name: 'platforms',
  initialState: initialUserPlatformsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    userPlatformsReceived: (state, action) => {
      state.loading = false
      state.userPlatformsTable = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
    userPlatformDetailsReceived: (state, action) => {
      state.loading = false
      state.userPlatformDetails = action.payload.data[0]
    },
  },
})

export const { startCall, userPlatformsReceived, catchError, userPlatformDetailsReceived } = userPlatformsSlice.actions
