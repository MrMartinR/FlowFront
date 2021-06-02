import { createSlice } from '@reduxjs/toolkit'

const initialUserOriginatorsState = {
  loading: false,
  userOriginatorsData: [],
  userOriginatorDetails: {},
  error: null as any,
  success: null as any,
  message: null as any,
}

export const userOriginatorsSlice = createSlice({
  name: 'userOriginators',
  initialState: initialUserOriginatorsState,
  reducers: {
    startCall: (state) => {
      state.loading = true
      state.success = null
      state.message = null
    },
    userOriginatorsReceived: (state, action) => {
      state.loading = false
      state.userOriginatorsData = action.payload.data
    },
    userOriginatorDetailsReceived: (state, action) => {
      state.loading = false
      state.userOriginatorDetails = action.payload.data
    },
    catchError: (state, action) => {
      state.loading = false
      state.success = false
      state.error = `${action.type}: ${action.payload.message}`
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
  },
})
