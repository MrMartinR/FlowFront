import axios from 'axios'
import store from '../../../../redux/store'
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
export const getAllCurrencies = () => {
  return axios.get(CURRENCIES_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Currency sending the optionsHeader in the call
 * @param CURRENCIES_URL, currencyId, optionsHeaders
 * @returns Data about a specific Currency
 */
export const getCurrencyById = (currencyId: any) => {
  return axios.get(`${CURRENCIES_URL}/${currencyId}`, optionsHeaders())
}

/**
 * POST method to create a new Currency to the server
 * sending the optionsHeader in the call
 * @param CURRENCIES_URL, currency
 */ 
  export const createCurrency = (data: any) => {
    const {
      auth: { user, client, expiry, token },
    } = store.getState()
    const form = {
      currency: data,
    }
  
    return axios.post(`${CURRENCIES_URL}`, form, {
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

/**
 * PUT method to update an currency on the server
 * @param CURRENCIES_URL, currency
 */
export function updateCurrency(data: any, id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    currency: data,
  }
  return axios.put(`${CURRENCIES_URL}/${id}`, form, {
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

/**
 * DELETE method to delete individual Currency sending the optionsHeader in the call
 * @param CURRENCIES_URL, currencyId, optionsHeaders
 */
export function deleteCurrency(id: any) {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.delete(`${CURRENCIES_URL}/${id}`, {
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
