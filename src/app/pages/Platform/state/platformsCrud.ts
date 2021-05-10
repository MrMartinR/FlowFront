import { API_URL } from '../../../utils'
import axios from 'axios'
import { optionsHeaders } from '../../../utils'
/**
 * This is the main API endpoint for platforms
 * @returns https://app.flowfin.tech/api/v1/platforms or
 * http://localhost:3000/api/v1/platforms
 */
export const PLATFORMS_URL = `${API_URL}/api/v1/platforms`
/**
 * GET method to fetch all the Plattforms sending the optionsHeader in the call
 * @param PLATFORMS_URL, optionsHeaders
 * @returns List of all the Platforms
 */
 export const getAllPlatforms = () => {
    return axios.get(PLATFORMS_URL, optionsHeaders());
  }

/**
 * GET method to fetch individual platform sending the optionsHeader in the call
 * @param PLATFORMS_URL, id, optionsHeaders
 * @returns Data about a specific Platform
 */
  export const getPlatformById = (id: any) => {
    return axios.get(`${PLATFORMS_URL}/${id}`, optionsHeaders());
  }

/**
 * GET method to fetch all the originators associated to a particular platform sending the optionsHeader in the call
 * @param PLATFORMS_URL, id, optionsHeaders
 * @returns List of all the originators associated to a particular platform
 */
  export const getPlatformOriginators = (id: any) => {
      return axios.get(`${PLATFORMS_URL}/${id}/platform_originators`, optionsHeaders());
  }

  /**
 * GET method to fetch all the loans associated to a particular platform sending the optionsHeader in the call
 * @param PLATFORMS_URL, id, optionsHeaders
 * @returns List of all the loans associated to a particular platform
 */
   export const getPlatformLoans = (id: any) => {
    return axios.get(`${PLATFORMS_URL}/${id}/loans`, optionsHeaders());
   }
