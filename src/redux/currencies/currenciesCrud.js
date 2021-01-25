import axios from 'axios'
import store from '../store'

const optionsHeaders = () => {
  const {
    auth: { user, client, expiry, token }
  } = store.getState()

  const options = {
    headers: {
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.email
    }
  }
  return options
}

// const API_URL = 'http://localhost:3001'
const API_URL = 'https://api.flowfin.tech'
// const API_URL = process.env.API_URL;
export const CURRENCY_URL = `${API_URL}/api/v1/currencies`

// CREATE =>  POST: add a new currency to the server
export function createCurrency(currency) {
  return axios.post(CURRENCY_URL, { currency })
}

export function getCurrencyById(currencyId) {
  return axios.get(`${CURRENCY_URL}/${currencyId}`, optionsHeaders())
}

export function findAllCurrencies() {
  return axios.get(CURRENCY_URL, optionsHeaders())
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCurrencies({ page, perPage = 10 }) {
  return axios.get(`${CURRENCY_URL}?page=${page}&per_page=${perPage}`, optionsHeaders())
}

// UPDATE => PUT: update the currency on the server
export function updateCurrency(currency) {
  return axios.put(`${CURRENCY_URL}/${currency.id}`, { currency })
}

// UPDATE Status
export function updateStatusForCurrencies(ids, status) {
  return axios.post(`${CURRENCY_URL}/updateStatusForCurrencies`, {
    ids,
    status
  })
}

// DELETE => delete the currency from the server
export function deleteCurrency(currencyId) {
  return axios.delete(`${CURRENCY_URL}/${currencyId}`)
}

// DELETE Currencies by ids
export function deleteCurrencies(ids) {
  return axios.post(`${CURRENCY_URL}/deleteCurrencies`, { ids })
}
