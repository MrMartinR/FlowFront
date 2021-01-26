import { createSlice } from '@reduxjs/toolkit'

const initialPlatformsState = {
  loading: false,
  platformsTable: [],
  platformDetails: [],
  platformOriginators: [],
  error: null as any,
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
      state.loading = false
      state.error = `${action.type}: ${action.payload.error}`
    },
    platformDetailsReceived: (state, action) => {
      state.loading = false
      state.platformDetails = action.payload.data[0]
    },
    platformOriginatorsReceived: (state, action) => {
      state.loading = false
      state.platformOriginators = action.payload.data
    }
  }

})

export const { startCall, 
               platformsReceived,
               catchError,
               platformDetailsReceived,
               platformOriginatorsReceived } = platformsSlice.actions
