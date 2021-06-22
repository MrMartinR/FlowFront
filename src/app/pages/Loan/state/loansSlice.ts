import { createSlice } from '@reduxjs/toolkit'

const initialLoansState = {
  listLoading: false,
  actionsLoading: false,
  loansData: null as any,
  loanDetails: null as any,
  error: null as any,
  success: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const loansSlice = createSlice({
  name: 'loans',
  initialState: initialLoansState,
  reducers: {
    startCall: (state, action) => {
      state.error = null
      state.success = null
      state.message = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    loansReceived: (state, action) => {
      state.listLoading = false
      state.loansData = action.payload.data
    },
    loanDetailsReceived: (state, action) => {
      state.actionsLoading = false
      state.loanDetails = action.payload.data
    },
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.success = false
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
    loanUpdate: (state, action) => {
      const { data } = action.payload
      // actualizase o state
      state.actionsLoading = false
      state.loanDetails = data
      state.success = true
    },
    loanDelete: (state, action) => {
      const { itm, success, message } = action.payload
      state.listLoading = false
      state.success = success
      state.message = message
    },
  },
})
