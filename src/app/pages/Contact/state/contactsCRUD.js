import axios from 'axios'
import store from '../../../../redux/store'

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

let API_URL;

if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:3001'
  
} else if(process.env.NODE_ENV === 'production'){
  API_URL = "https://api.flowfin.tech";
  
}
// the API endpoint
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`

// READ
export function getAllContacts() {
  return axios.get(CONTACTS_URL,  optionsHeaders())
}

export function getContactById(contactsId) {
  return axios.get(`${CONTACTS_URL}/${contactsId}`, optionsHeaders())
}



