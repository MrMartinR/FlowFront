import { createSlice } from '@reduxjs/toolkit'
// import Util from '../../../utils'

const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactMethodsTable: {
    entities: null as any,
    success: false
  },
  error: null as any
}
export const callTypes = {
  list: 'list',
  action: 'action'
}
export const contactMethodsSlice = createSlice({
  name: 'contact methods',

  initialState: initialContactsState,
  reducers: {
    // when error occurs catch it
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    // set the state in which the process is in loading or setting the state
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    // update the contactMethodsTable state on all fetch based on contact id
    contactMethodsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.contactMethodsTable.entities = data.data
      state.contactMethodsTable.success = data.success
    }
  }
})
