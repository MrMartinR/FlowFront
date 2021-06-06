import axios from 'axios'
import store from '../../../../redux/store'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for account
 * @returns https://app.flowfin.tech/api/v1/accounts or
 * http://localhost:3000/api/v1/accounts
 */
export const ACCOUNTS_URL = `${API_URL}/api/v1/accounts`

/**
 * GET method to fetch all the Accounts sending the optionsHeader in the call
 * @param ACCOUNTS_URL, optionsHeaders
 * @returns List of all the Accounts
 */
export const getAllAccounts = () => {
  return axios.get(ACCOUNTS_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Account sending the optionsHeader in the call
 * @param ACCOUNTS_URL, accountsId, optionsHeaders
 * @returns Data about a specific Account
 */
export const getAccountById = (id: string) => {
  return axios.get(`${ACCOUNTS_URL}/${id}`, optionsHeaders())
}

/**
 * PUT method to update an Account on the server
 * @param ACCOUNTS_URL, account
 */
export const updateAccount = (data: any, id: string) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    account: data,
  }
  return axios.put(`${ACCOUNTS_URL}/${id}`, form, {
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
 * POST method to create a new Account to the server
 * sending the optionsHeader in the call
 * @param ACCOUNTS_URL, account
 */
export const createAccount = (data: any) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    account: data,
  }

  return axios.post(`${ACCOUNTS_URL}`, form, {
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

export const deleteAccount = (id: string) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.delete(`${ACCOUNTS_URL}/${id}`, {
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
