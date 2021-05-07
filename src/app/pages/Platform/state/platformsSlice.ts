import { createSlice } from '@reduxjs/toolkit'

const initialPlatformsState = {
  loading: false,
  platformsTable: [],
  platformDetails: {},
  platformOriginators: [],
  platformLoans: [],
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
      state.platformsTable = action.payload.data
      state.loading = false
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.platformOriginators = []
      state.loading = false
    },
    platformDetailsReceived: (state, action) => {
      state.platformDetails = action.payload.data[0]
      state.loading = false
    },
    platformOriginatorsReceived: (state, action) => {
      state.platformOriginators = action.payload.message
      state.loading = false
    },
    platformLoansReceived: (state, action) => {
      state.platformLoans = action.payload.message
      state.loading = false
    },
  },
})

export const {
  startCall,
  platformsReceived,
  catchError,
  platformDetailsReceived,
  platformOriginatorsReceived,
  platformLoansReceived,
} = platformsSlice.actions
