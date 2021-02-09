import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../utils'

// the API endpoint
export const CURRENCIES_URL = `${API_URL}/api/v1/currencies`

// READ
export function getAllCurrencies() {
  return axios.get(CURRENCIES_URL, optionsHeaders())
}

export function getCurrencyById(currencyId: any) {
  return axios.get(`${CURRENCIES_URL}/${currencyId}`, optionsHeaders())
}

// CREATE =>  POST: add a new currency to the server
export function createCurrency(currency: any) {
  return axios.post(CURRENCIES_URL, { currency })
}

// UPDATE => PUT: update the currency on the server
export function updateCurrency(currency: any) {
  return axios.put(`${CURRENCIES_URL}/${currency.id}`, { currency })
}

// DELETE => delete the currency from the server
export function deleteCurrency(currencyId: any) {
  return axios.delete(`${CURRENCIES_URL}/${currencyId}`)
}
