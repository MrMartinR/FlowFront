import axios from 'axios'
import store from '../../../../redux/store'
import { API_URL } from '../../../../redux/utils'
import { optionsHeaders } from '../../../../redux/utils'

export const COUNTRY_URL = `${API_URL}/api/v1/countries`

// CREATE =>  POST: add a new country to the server
export function createCountry(country: any) {
  return axios.post(COUNTRY_URL, { country })
}

// READ
export function getAllCountries() {
  return axios.get(COUNTRY_URL, optionsHeaders())
}

export function getCountryById(countryId: any) {
  return axios.get(`${COUNTRY_URL}/${countryId}`, optionsHeaders())
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCountries({ page, perPage = 10 }: any) {
  return axios.get(`${COUNTRY_URL}?page=${page}&per_page=${perPage}`, optionsHeaders())
}

// UPDATE => PUT: update the country on the server
export function updateCountry(country: any) {
  return axios.put(`${COUNTRY_URL}/${country.id}`, { country })
}

// UPDATE Status
export function updateStatusForCountries({ ids, status }: any) {
  return axios.post(`${COUNTRY_URL}/updateStatusForCountries`, {
    ids,
    status,
  })
}

// DELETE => delete the country from the server
export function deleteCountry(countryId: any) {
  return axios.delete(`${COUNTRY_URL}/${countryId}`)
}

// DELETE Countries by ids
export function deleteCountries(ids: any) {
  return axios.post(`${COUNTRY_URL}/deleteCountries`, { ids })
}
