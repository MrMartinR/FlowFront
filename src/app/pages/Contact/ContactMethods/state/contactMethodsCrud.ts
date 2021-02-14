import axios from 'axios'
import store from '../../../../../redux/store'
import { API_URL } from '../../../../utils'

export const CONTACT_METHODS_URL = `${API_URL}/api/v1/contact_methods`

/*
 * promise function to process the axios get given contact id
 * sends header/ authorization
 */
export function getContactMethods(contactId: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.get(`${CONTACT_METHODS_URL}`, {
    params: { contact_id: contactId },
    headers: {
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
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
