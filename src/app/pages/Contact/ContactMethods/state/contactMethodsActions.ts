import * as requestFromServer from './contactMethodsCRUD'
import { contactMethodsSlice, callTypes } from './contactMethodsSlice'

const { actions } = contactMethodsSlice

/*
* In a async approach, process the getContactMethods promise
* pass the promise return data to contactMethodsFetched to populate the state
* get a contact  methods 
*/
export const fetchContactMethods = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getContactMethods(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactMethodsFetched({ data }))
    })
    .catch((error)  => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
/*
* create a new contact method
* data: from onsubmit form
* on promise process check is status is true
* dispatch the contactMethodsCreate to push the new data
* this will update the contactMethodsFetched states
*/
export const createContactMethods = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list}))
  return requestFromServer
    .createContactMethods(data)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactMethodsCreate(data))
    })
    .catch((error)  => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}