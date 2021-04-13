import * as requestFromServer from './contactsCrud'
import { contactsSlice, callTypes } from './contactsSlice'

const { actions } = contactsSlice

// fetch all contacts
export const fetchContacts = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getAllContacts()
    .then((response) => {
      const { data } = response
      dispatch(actions.contactsFetched({ data }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Contacts"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

// get a single contact
export const fetchContact = (id: any) => (dispatch: any) => {
  if (!id) {
    let error = "Can't find Contact without id"
    return dispatch(actions.catchError({ error, callType: callTypes.list }))
  }

  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getContactById(id)
    .then((response) => {
      //console.log(JSON.stringify(response.data));
      const { data } = response
      dispatch(actions.contactFetched({ data }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Contact"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
