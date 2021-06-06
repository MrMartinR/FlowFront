import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for user_platforms
 * @returns https://app.flowfin.tech/api/v1/user_platforms or
 * http://localhost:3000/api/v1/user_platforms
 */
export const USER_PLATFORMS_URL = `${API_URL}/api/v1/user_platforms`
/**
 * GET method to fetch all the User Platforms sending the optionsHeader in the call
 * @param USER_PLATFORMS_URL, optionsHeaders
 * @returns List of all the User Platforms
 */
 export function getAllUserPlatforms() {
    return axios.get(USER_PLATFORMS_URL, optionsHeaders())
  }
  
  /**
 * GET method to fetch individual User Platform sending the optionsHeader in the call
 * @param USER_PLATFORMS_URL, userPlatformsId, optionsHeaders
 * @returns Data about a specific User Platform
 */
export function getUserPlatformById(userPlatformsId: any) {
    return axios.get(`${USER_PLATFORMS_URL}/${userPlatformsId}`, optionsHeaders())
  }