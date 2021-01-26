import { createSlice } from '@reduxjs/toolkit'

const initialPlatformsState = {
  loading: false,
  platformsTable: [],
  platformDetails: [],
  platformContact: [],
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
    platformContactReceived: (state, action) => {
      state.platformContact = action.payload.data
    },
    platformOriginatorsReceived: (state, action) => {
      state.platformOriginators = action.payload.data
    },
    platformLoansReceived: (state, action) => {
      state.platformLoans = action.payload.data
    },
  }

})

export const { startCall, 
               platformsReceived,
               catchError,
               platformDetailsReceived,
               platformContactReceived,
               platformOriginatorsReceived,
               platformLoansReceived, } = platformsSlice.actions
