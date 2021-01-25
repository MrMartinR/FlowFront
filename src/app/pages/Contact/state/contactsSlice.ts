import { createSlice } from '@reduxjs/toolkit'
// import Util from '../../../utils'

const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactsTable: {
    entities: null as any,
    success: false,
  },
  singleContact: {
    entry: null as any,
  },
  contactForEdit: undefined,
  error: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const contactsSlice = createSlice({
  name: 'contacts',

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

    // update the contact state on all fetch
    contactsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.contactsTable.entities = data.data
      state.contactsTable.success = data.success
    },

    // update the contact state on fetch a single contact
    contactFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.singleContact.entry = data.data
      state.contactsTable.success = data.success
    },

    // on creation a new contact append it to existing contacts
    newContactCreated: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.error = null
      state.contactsTable.entities.unshift(data.data)
    },
  },
})
