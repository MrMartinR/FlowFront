import axios from 'axios';
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for user_originators
 * @returns https://app.flowfin.tech/api/v1/user_originators or
 * http://localhost:3000/api/v1/user_originators
 */
export const USER_ORIGINATORS_URL = `${API_URL}/api/v1/user_originators`
/**
 * GET method to fetch all the User Originators sending the optionsHeader in the call
 * @param USER_ORIGINATORS_URL, optionsHeaders
 * @returns List of all the User Originators
 */
 export const getAllUserOriginators = () => {
    return axios.get(USER_ORIGINATORS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual user originator sending the optionsHeader in the call
 * @param USER_ORIGINATORS_URL, id, optionsHeaders
 * @returns Data about a specific User Originator
 */
   export const getUserOriginatorById = (id: any) => {
    return axios.get(`${USER_ORIGINATORS_URL}/${id}`, optionsHeaders());
  }