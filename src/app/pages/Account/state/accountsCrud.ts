import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../../redux/utils'

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
export function getAllAccounts() {
  return axios.get(ACCOUNTS_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Account sending the optionsHeader in the call
 * @param ACCOUNTS_URL, accountsId, optionsHeaders
 * @returns Data about a specific Account
 */
export function getAccountById(accountsId: any) {
  return axios.get(`${ACCOUNTS_URL}/${accountsId}`, optionsHeaders())
}

/**
 * PUT method to update an Account on the server
 * @param ACCOUNTS_URL, account
 */
export function updateAccount(account: any) {
  return axios.put(`${ACCOUNTS_URL}/${account.id}`, { account })
}

/**
 * POST method to add a new Account to the server
 * sending the optionsHeader in the call
 * @param ACCOUNTS_URL, account
 */
export function createAccount(account: any) {
  return axios.post(ACCOUNTS_URL, { account })
}
