import { createSlice } from '@reduxjs/toolkit'
let lodash = require('lodash')
const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactsTable: {
    entities: null as any,
    success: false,
  },
  singleContact: {
    entry: {
      attributes: {
        contact_methods: null as any,
      },
    },
    success: false,
  },
  contactForEdit: null as any,
  deleteResponse: null as any,
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
      state.contactsTable.success = true
    },

    // update the contact state on fetch a single contact
    contactFetched: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.error = null
      state.singleContact.entry = data.data
      state.singleContact.success = true
    },

    // on creation a new contact append it to existing contacts
    contactCreate: (state, action) => {
      const { data } = action.payload
      const newContact = {
        id: data.id,
        type: data.type,
        attributes: {
          name: data.attributes.name?data.attributes.name:data.attributes.trade_name
        }
      }
      state.listLoading = false
      state.error = null
      state.contactsTable.entities.unshift(newContact)
      state.contactsTable.success = true
    },
    contactUpdate: (state, action) => {
      const { data } = action.payload
      const newContact = {
        id: data.id,
        type: data.type,
        attributes: {
          name: data.attributes.name?data.attributes.name:data.attributes.trade_name
        }
      }
      let newState = []
      lodash.find(state.contactsTable.entities, function (o: any) {
        if (o.id !== newContact.id) {
          newState.push(o)
        }
      })
      newState.unshift(newContact)
      state.actionsLoading = false
      state.error = null
      state.contactsTable.entities = newState
    },
    contactDelete: (state, action) => {
      const { itm } = action.payload
      let newState = [] as any
      lodash.find(state.contactsTable.entities, function (o: any) {
        if (o.id !== itm) {
          newState.push(o)
        }
      })
      state.listLoading = false
      state.error = null
      state.contactsTable.entities = newState
    },


    /*
     * STATE(answer received)
     * update the contactsTable state with a new contact method
     * sets actionsloading states to false, the fetching is complete
     * push data into entities
     */

    contactMethodsCreate: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.error = null
      const entry = {
        id: data.id,
        ...data.attributes
      }
      state.singleContact.entry.attributes.contact_methods.unshift(entry)
    },
    /*
     * STATE(answered)
     * Update an entry using the update form
     * get the data from the payload
     * extract the id and find the entry in state.singleContact.entry?.attributes.contact_methods.entities
     * delete it
     * push the new data in the state.singleContact.entry?.attributes.contact_methods.entities
     *
     * approach justification
     * prevent a new fetch of all data and only push the edited data
     *
     */
    contactMethodsUpdate: (state, action) => {
      const { data } = action.payload
      let get_id = data.id
      let newState = []
      lodash.find(state.singleContact.entry.attributes.contact_methods, function (o: any) {
        if (o.id !== get_id) {
          newState.push(o)
        }
      })
      const entry = {
        id: data.id,
        ...data.attributes
      }
      newState.unshift(entry)
      state.actionsLoading = false
      state.error = null
      state.singleContact.entry.attributes.contact_methods = newState

    }, 
    /*
     * STATE(answered)
     * To delete a contact method, the delete will return status and message
     * we will pass the itm being deleted as a params
     * filter using lodash, and return all except the itm with the given id
     * update the state with the new state minus the itm
     * update message with the delete message
     * update success to true of false
     */
    contactMethodsDelete: (state, action) => {
    const { message, itm } = action.payload
      let newState = [] as any
      lodash.find(state.singleContact.entry.attributes.contact_methods, function (o: any) {
        if (o.id !== itm) {
          newState.push(o)
        }
      })
      state.actionsLoading = false
      state.error = null
      state.singleContact.entry.attributes.contact_methods = newState
      state.deleteResponse = message
    } 
  },
})
