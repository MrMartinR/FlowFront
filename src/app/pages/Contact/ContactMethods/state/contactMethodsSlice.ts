import { createSlice } from '@reduxjs/toolkit'
// import Util from '../../../utils'

const initialContactsState = {
  listLoading: true,
  actionsLoading: false,
  contactMethodsTable: {
    entities: null as any,
    success: false
  },
  error: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const contactMethodsSlice = createSlice({
  name: 'contact methods',

  initialState: initialContactsState,
  reducers: {
    /*
    * STATE(abort processing) 
    * when error occurs catch it 
    * set the listLoading and action loading to false
    * populate error state with the error
    */
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },

    /*
    * STATE(during call) 
    * set the state in which the process is in loading or setting the state
    * notifies that the state is being processed and
    * we can have a spinner maybe to show data is being process wait. 
    * list is when we are fetching data
    * action is when we are performing for example a post
    * if action.payload.callType is list, let listLoading to true
    * if action.payload.callType is action, let actionsLoading to true
    */
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    /*
    * STATE(answer received) 
    * update the contactMethodsTable state on all fetch based on contact id
    * sets listloading states to false, the fetching is complete
    * set error to null, none occured
    * set success to true 
    * set data into entities
    */
    contactMethodsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.contactMethodsTable.entities = data.data
      state.contactMethodsTable.success = data.success
    },
     /*
    * STATE(answer received) 
    * update the contactMethodsTable state with a new contact method
    * sets listloading states to false, the fetching is complete
    * set error to null, none occured
    * set success to true 
    * push data into entities
    */
    contactMethodsCreate: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.contactMethodsTable.entities.push(data[0])
      state.contactMethodsTable.success = true
    },



  
  
   
  },
})
