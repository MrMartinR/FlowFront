import axios from 'axios'
import store from '../../../../../redux/store'

const optionsHeaders = () => {
  const {
    auth: {
      user, client, expiry, token,
    },
  } = store.getState()

  const options = {
    headers: {
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.email,
    },
  }
  return options
}

// TODO: define a system to get the right url depending of the environment and place it in a global scope?
// const API_URL = 'http://localhost:3001'
const API_URL = "https://api.flowfin.tech";
// const API_URL = process.env.API_URL;

// especify the API endpoint
export const CONTACT_METHODS_URL = `${API_URL}/api/v1/contact_methods`

// READ

export function getContactMethods(contactsId) {
  return axios.get(`${CONTACT_METHODS_URL}`,{
    contact_method: {
      contact_id: `${contactsId}`
    }
  }, optionsHeaders())
}



