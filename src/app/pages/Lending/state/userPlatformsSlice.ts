import { createSlice } from '@reduxjs/toolkit'

const initialUserPlatformsState = {
  loading: false,
  actionsLoading: false,
  userPlatformsTable: null as any,
  userPlatformDetails: null as any,
  error: null as any,
  success: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const userPlatformsSlice = createSlice({
  name: 'userPlatforms',
  initialState: initialUserPlatformsState,
  reducers: {
    startCall: (state, action) => {
      state.error = null
      state.success = null
      state.message = null
      if (action.payload.callType === callTypes.list) {
        state.loading = true
      } else {
        state.actionsLoading = true
      }
    },
    userPlatformsReceived: (state, action) => {
      state.loading = false
      state.userPlatformsTable = action.payload.data
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.success = false
      if (action.payload.callType === callTypes.list) {
        state.loading = false
      } else {
        state.actionsLoading = false
      }
    },
    userPlatformDetailsReceived: (state, action) => {
      state.actionsLoading = false
      state.userPlatformDetails = action.payload.data
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
  },
})