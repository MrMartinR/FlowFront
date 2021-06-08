import { createSlice } from '@reduxjs/toolkit'
const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactsTable: {
    entities: null as any,
  },
  singleContact: {
    entry: {
      attributes: {
        contact_methods: null as any,
      },
    },
  },
  success: null as any,
  message: null as any,
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
      state.success = false
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    // set the state in which the process is in loading or setting the state
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

    // update the contact state on all fetch
    contactsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.contactsTable.entities = data.data
    },

    // update the contact state on fetch a single contact
    contactFetched: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.singleContact.entry = data.data
    },

    // on creation a new contact append it to existing contacts
    contactCreate: (state, action) => {
      const { data } = action.payload
      // crease a variable para gardar o novo contact
      const newContact = {
        id: data.id,
        type: data.type,
        attributes: {
          name_header: data.attributes.name_header,
        },
        links: {
          self: `https://api.flowfin.tech/contacts/${data.id}`
        }
      }
      // metese o novo contact na lista
      const newState = state.contactsTable.entities
      newState.unshift(newContact)
      // ordease a lista
      const result = sort(newState)
      // actualizase o state
      state.listLoading = false
      state.contactsTable.entities = result
      state.success = true
    },
    contactUpdate: (state, action) => {
      const { data } = action.payload
      // crease a variable para gardar os datos do contact a editar
      const newContact = {
        id: data.id,
        type: data.type,
        attributes: {
          name_header: data.attributes.name_header,
        }
      }
      // crease unha nova lista sustituindo o contact a editar
      const newState = [] as any
      state.contactsTable.entities.map((o: any) => {
        if (o.id !== newContact.id) {
          newState.push(o)
        } else newState.push(newContact)
        return newState;
      })
      // ordease a lista
      const result = sort(newState)
      // actualizase o state
      state.actionsLoading = false
      state.contactsTable.entities = result
      state.success = true
    },
    contactDelete: (state, action) => {
      const { itm, success, message } = action.payload
      let newState = [] as any
      state.contactsTable.entities.map((o: any) => {
        if (o.id !== itm) {
          newState.push(o)
        }
        return newState;
      })
      state.listLoading = false
      state.contactsTable.entities = newState
      state.success = success
      state.message = message
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
      state.success = true
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
     * push the new data in the state.singleContact.entry.attributes.contact_methods
     *
     * approach justification
     * prevent a new fetch of all data and only push the edited data
     *
     */
    contactMethodsUpdate: (state, action) => {
      const { data } = action.payload
      let get_id = data.id
      let newState = [] as any
      state.singleContact.entry.attributes.contact_methods.map((o: any) => {
        if (o.id !== get_id) {
          newState.push(o)
        }
        return newState;
      })
      const entry = {
        id: data.id,
        ...data.attributes
      }
      newState.unshift(entry)
      state.actionsLoading = false
      state.success = true
      state.singleContact.entry.attributes.contact_methods = newState

    }, 
    /*
     * STATE(answered)
     * To delete a contact method, the delete will return status and message
     * we will pass the itm being deleted as a params
     * update the state with the new state minus the itm
     * update message with the delete message
     * update success to true of false
     */
    contactMethodsDelete: (state, action) => {
    const { message, itm } = action.payload
      let newState = [] as any
      state.singleContact.entry.attributes.contact_methods.map((o: any) => {
        if (o.id !== itm) {
          newState.push(o)
        }
        return newState;
      })
      state.actionsLoading = false
      state.success = true
      state.singleContact.entry.attributes.contact_methods = newState
      state.message = message
    },
    
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
  },
})

const sort = (list: any) => {
  // array temporal para ordear alfabeticamente
  const mapped = list.map(function(el: any, i: any) {
    return { index: i, value: el.attributes.name_header.toLowerCase() };
  })
  // ordeando o array mapeado
  mapped.sort(function(a: any, b: any) {
    if (a.value > b.value) {
      return 1
    }
    if (a.value < b.value) {
      return -1
    }
    return 0
  })
  // contenedor para o array ordeado
  const result = mapped.map(function(el:any){
    return list[el.index];
  })
  // devolvese o array ordeado
  return result
}
