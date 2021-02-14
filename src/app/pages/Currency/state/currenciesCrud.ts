import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for account
 * Only accesed by users with admin or contributor role
 * @returns https://app.flowfin.tech/api/v1/currencies or
 * http://localhost:3000/api/v1/currencies
 */
export const CURRENCIES_URL = `${API_URL}/api/v1/currencies`

/**
 * GET method to fetch all the Currencies sending the optionsHeader in the call
 * @param CURRENCIES_URL, optionsHeaders
 * @returns List of all the Currencies
 */
export function getAllCurrencies() {
  return axios.get(CURRENCIES_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Currency sending the optionsHeader in the call
 * @param CURRENCIES_URL, currencyId, optionsHeaders
 * @returns Data about a specific Currency
 */
export function getCurrencyById(currencyId: any) {
  return axios.get(`${CURRENCIES_URL}/${currencyId}`, optionsHeaders())
}

/**
 * POST method to create a new Currency to the server
 * sending the optionsHeader in the call
 * @param CURRENCIES_URL, currency
 */ export function createCurrency(currency: any) {
  return axios.post(CURRENCIES_URL, { currency })
}

/**
 * PUT method to update an currency on the server
 * @param CURRENCIES_URL, currency
 */
export function updateCurrency(currency: any) {
  return axios.put(`${CURRENCIES_URL}/${currency.id}`, { currency })
}

/**
 * DELETE method to delete individual Currency sending the optionsHeader in the call
 * @param CURRENCIES_URL, currencyId, optionsHeaders
 */
export function deleteCurrency(currencyId: any) {
  return axios.delete(`${CURRENCIES_URL}/${currencyId}`)
}
