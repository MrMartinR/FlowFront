import * as requestFromServer from './contactMethodsCRUD'
import { contactMethodsSlice, callTypes } from './contactMethodsSlice'

const { actions } = contactMethodsSlice



// get a contact  methods 
export const fetchContactMethods = (id) => (dispatch) => {
  if (!id) {
    let error = "Can't find contact methods without id"
    return dispatch(actions.catchError({ error, callType: callTypes.action }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getContactMethods(id)
    .then((response) => {
      let methods = response.data
      dispatch(actions.contactMethodsFetched({ methods }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
