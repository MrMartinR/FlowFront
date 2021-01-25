import axios from 'axios'
import store from '../../../../../redux/store'
// const {auth: { user, client, expiry, token },} = store.getState();

let API_URL

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:3001'
} else if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.flowfin.tech'
}
export const CONTACT_METHODS_URL = `${API_URL}/api/v1/contact_methods`
// READ

export function getContactMethods(contactsId: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.get(`${CONTACT_METHODS_URL}`, {
    params: { contact_id: contactsId },
    headers: {
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.email,
    },
  })
}
