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
    return dispatch(actions.catchError({ error, callType: callTypes.action }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getContactById(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactFetched({ data }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Contact"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/*
 * create a new contact
 * data: from onsubmit form
 * on promise process check is status is true
 * dispatch the contactCreate to push the new data
 * this will update the contactFetched states
 */
export const createContact = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .createContact(data)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactCreate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
/*
 * update the contact
 * data: from the edit submission form
 * updateContact to trigger the promise
 * contactUpdate to update the state
 */
export const updateContact = (data: any, id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateContact(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactUpdate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/*
 * delete a contact
 * id: this will be contact is
 * deleteContact to trigger the promise
 */
export const deleteContact = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  let contactId = id
  return requestFromServer
    .deleteContact(contactId)
    .then((response) => {
      const { data } = response
      const id = { itm: contactId }
      const returnedTarget = Object.assign(data, id)
      dispatch(actions.contactDelete(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact"
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
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createContactMethods(data)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactMethodsCreate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/*
 * update the contact method
 * data: from the edit submission form
 * updateContactMethods to trigger the promise
 * contactMethodsUpdate to update the state
 */
export const updateContactMethods = (data: any, id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateContactMethods(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.contactMethodsUpdate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/*
 * delete a contact method
 * id: this will be contact method is
 * deleteContactMethods to trigger the promise
 * contactMethodsUpdate to update the state
 */
export const deleteContactMethods = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  let contactId = id
  return requestFromServer
    .deleteContactMethod(contactId)
    .then((response) => {
      const { data } = response
      const id = { itm: contactId }
      const returnedTarget = Object.assign(data, id)
      dispatch(actions.contactMethodsDelete(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't find contact methods"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const resetSuccessContact = () => (dispatch: any) => {
  dispatch( actions.contactResetSuccess({ success: null }));
}