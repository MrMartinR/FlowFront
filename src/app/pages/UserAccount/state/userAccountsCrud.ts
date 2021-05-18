import axios from 'axios';
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for user_accounts
 * @returns https://app.flowfin.tech/api/v1/user_accounts or
 * http://localhost:3000/api/v1/user_accounts
 */
export const USER_ACCOUNTS_URL = `${API_URL}/api/v1/user_accounts`
/**
 * GET method to fetch all the User Accounts sending the optionsHeader in the call
 * @param USER_ACCOUNTS_URL, optionsHeaders
 * @returns List of all the User Accounts
 */
 export const getAllUserAccounts = () => {
    return axios.get(USER_ACCOUNTS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual User Account sending the optionsHeader in the call
 * @param USER_ACCOUNTS_URL, contactsId, optionsHeaders
 * @returns Data about a specific User Account
 */
export function getUserAccountById(id: any) {
    return axios.get(`${USER_ACCOUNTS_URL}/${id}`, optionsHeaders())
  }

export function getUserTransactions(id:any) {
    return axios.get(`${USER_ACCOUNTS_URL}/${id}/transactions`, optionsHeaders());
}