import axios from "axios"
import store from "../../../../redux/store"

const optionsHeaders = () => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()

  const options = {
    headers: {
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
      "Content-Type": "application/json; charset=utf-8",
      "access-token": token,
      "token-type": "Bearer",
      client,
      expiry,
      uid: user.email,
    },
  }
  return options
}

// [REV] define a system to get the right url depending of the environment and place it in a global scope?
const API_URL = "http://localhost:3001"
// const API_URL = "https://api.flowfin.tech";
// const API_URL = process.env.API_URL;

// especify the API endpoint
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`

// READ
export function getAllContacts() {
  return axios.get(CONTACTS_URL)
}

export function getContactById(contactsId) {
  return axios.get(`${CONTACTS_URL}/${contactsId}`, optionsHeaders())
}

// [REV] Stick to Infinite list
// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findContacts({ page, perPage = 10 }) {
  perPage = 1000
  return axios.get(
    `${CONTACTS_URL}?page=${page}&per_page=${perPage}`,
    optionsHeaders()
  )
}

// This works similar to findContacts. The difference is that rather than replacing existing data,
// its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
export function findNextContacts({ page, perPage = 10 }) {
  return axios.get(
    `${CONTACTS_URL}?page=${page}&per_page=${perPage}`,
    optionsHeaders()
  )
}
