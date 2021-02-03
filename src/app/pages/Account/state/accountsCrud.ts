import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../../redux/utils'

// the API endpoint
export const ACCOUNTS_URL = `${API_URL}/api/v1/accounts`

// READ
export function getAllAccounts() {
  return axios.get(ACCOUNTS_URL, optionsHeaders())
}

export function getAccountById(accountsId: any) {
  return axios.get(`${ACCOUNTS_URL}/${accountsId}`, optionsHeaders())
}
