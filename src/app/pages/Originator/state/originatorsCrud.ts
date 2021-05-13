import axios from 'axios';
import { API_URL } from '../../../utils'
import { optionsHeaders } from '../../../utils'
/**
 * This is the main API endpoint for originators
 * @returns https://app.flowfin.tech/api/v1/originators or
 * http://localhost:3000/api/v1/originators
 */
export const ORIGINATORS_URL = `${API_URL}/api/v1/originators`
/**
 * GET method to fetch all the Originators sending the optionsHeader in the call
 * @param ORIGINATORS_URL, optionsHeaders
 * @returns List of all the Originators
 */
 export const getAllOriginators = () => {
    return axios.get(ORIGINATORS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual originator sending the optionsHeader in the call
 * @param ORIGINATORS_URL, id, optionsHeaders
 * @returns Data about a specific Platform
 */
   export const getOriginatorById = (id: any) => {
    return axios.get(`${ORIGINATORS_URL}/${id}`, optionsHeaders());
  }

  /**
 * GET method to fetch all the loans associated to a particular originator sending the optionsHeader in the call
 * @param ORIGINATORS_URL, id, optionsHeaders
 * @returns List of all the loans associated to a particular platform
 */
   export const getPlatformLoans = (id: any) => {
    return axios.get(`${ORIGINATORS_URL}/${id}/loans`, optionsHeaders());
   }