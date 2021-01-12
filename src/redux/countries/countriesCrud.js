import axios from 'axios'
import store from '../store'

const optionsHeaders = () => {
  const {
    auth: {
      user, client, expiry, token,
    },
  } = store.getState()

  const options = {
    headers: {
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

// const API_URL = 'http://localhost:3001'
const API_URL = 'https://api.flowfin.tech';
// const API_URL = process.env.API_URL;
export const COUNTRY_URL = `${API_URL}/api/v1/countries`

// CREATE =>  POST: add a new country to the server
export function createCountry(country) {
  return axios.post(COUNTRY_URL, { country })
}

// READ
export function getAllCountries() {
  return axios.get(COUNTRY_URL, optionsHeaders())
}

export function getCountryById(countryId) {
  return axios.get(`${COUNTRY_URL}/${countryId}`, optionsHeaders())
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCountries({ page, perPage = 10 }) {
  return axios.get(
    `${COUNTRY_URL}?page=${page}&per_page=${perPage}`,
    optionsHeaders(),
  )
}

// UPDATE => PUT: update the country on the server
export function updateCountry(country) {
  return axios.put(`${COUNTRY_URL}/${country.id}`, { country })
}

// UPDATE Status
export function updateStatusForCountries(ids, status) {
  return axios.post(`${COUNTRY_URL}/updateStatusForCountries`, {
    ids,
    status,
  })
}

// DELETE => delete the country from the server
export function deleteCountry(countryId) {
  return axios.delete(`${COUNTRY_URL}/${countryId}`)
}

// DELETE Countries by ids
export function deleteCountries(ids) {
  return axios.post(`${COUNTRY_URL}/deleteCountries`, { ids })
}
