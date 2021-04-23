import axios from 'axios'
import store from '../../../../redux/store'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for contacts
 * @returns https://app.flowfin.tech/api/v1/contacts or
 * http://localhost:3000/api/v1/contacts
 */
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`
export const CONTACT_METHODS_URL = `${API_URL}/api/v1/contact_methods`
/**
 * GET method to fetch all the Contacts sending the optionsHeader in the call
 * @param CONTACTS_URL, optionsHeaders
 * @returns List of all the Contacts
 */
export function getAllContacts() {
  return axios.get(CONTACTS_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Contact sending the optionsHeader in the call
 * @param CONTACTS_URL, contactsId, optionsHeaders
 * @returns Data about a specific Contact
 */
export function getContactById(contactId: any) {
  return axios.get(`${CONTACTS_URL}/${contactId}`, optionsHeaders())
}

/*
 * promise function to process the axios post given data
 * sends header/ authorization
 */
export function createContact(data: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    contact_method: data,
  }

  return axios.post(`${CONTACTS_URL}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}

/*
 * promise function to process the axios puts given data
 * sends header/ authorization
 */
export function updateContact(data: any, id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    contact_method: data,
  }

  return axios.put(`${CONTACTS_URL}/${id}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}
/*

*/
export function deleteContact(id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.delete(`${CONTACTS_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}


/*
 * promise function to process the axios post given data
 * sends header/ authorization
 */
export function createContactMethods(data: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    contact_method: data,
  }

  return axios.post(`${CONTACT_METHODS_URL}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}
/*
 * promise function to process the axios puts given data
 * sends header/ authorization
 */
export function updateContactMethods(data: any, id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    contact_method: data,
  }

  return axios.put(`${CONTACT_METHODS_URL}/${id}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}
/*

*/
export function deleteContactMethod(id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.delete(`${CONTACT_METHODS_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}
