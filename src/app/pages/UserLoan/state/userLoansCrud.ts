import axios from 'axios';
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for user_loans
 * @returns https://app.flowfin.tech/api/v1/user_loans or
 * http://localhost:3000/api/v1/user_loans
 */
export const USER_LOANS_URL = `${API_URL}/api/v1/user_loans`
/**
 * GET method to fetch all the User Loans sending the optionsHeader in the call
 * @param USER_LOANS_URL, optionsHeaders
 * @returns List of all the User Loans
 */
 export const getAllUserLoans = () => {
    return axios.get(USER_LOANS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual user loan sending the optionsHeader in the call
 * @param USER_LOANS_URL, id, optionsHeaders
 * @returns Data about a specific User Loan
 */
   export const getUserLoanById = (id: any) => {
    return axios.get(`${USER_LOANS_URL}/${id}`, optionsHeaders());
  }