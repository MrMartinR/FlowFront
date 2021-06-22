import axios from 'axios';
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for loans
 * @returns https://app.flowfin.tech/api/v1/loans or
 * http://localhost:3000/api/v1/loans
 */
export const LOANS_URL = `${API_URL}/api/v1/loans`
/**
 * GET method to fetch all the Loans sending the optionsHeader in the call
 * @param LOANS_URL, optionsHeaders
 * @returns List of all the Loans
 */
 export const getAllLoans = () => {
    return axios.get(LOANS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual loan sending the optionsHeader in the call
 * @param LOANS_URL, id, optionsHeaders
 * @returns Data about a specific Loan
 */
   export const getLoanById = (id: any) => {
    return axios.get(`${LOANS_URL}/${id}`, optionsHeaders());
  }
  /*
 * promise function to process the axios puts given data
 * sends header/ authorization
 */
export const updateLoan = (data: any, id: any) => {
  const form = {
    contact: data,
  }

  return axios.put(`${LOANS_URL}/${id}`, form, optionsHeaders())
}
  export const deleteLoan = (id: any) => {
    return axios.delete(`${LOANS_URL}/${id}`, optionsHeaders())
  }
  