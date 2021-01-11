import * as requestFromServer from './contactMethodsCRUD'
import { contactMethodsSlice, callTypes } from './contactMethodsSlice'

const { actions } = contactMethodsSlice



// get a contact  methods 

export const fetchContactMethods = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getContactMethods(id)
    .then((response) => {
      const { data } = response.data
      console.log("resrs",data)
      dispatch(actions.contactMethodsFetched({ data }))
    })
    .catch((error)  => {
      console.log("error", error)
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
