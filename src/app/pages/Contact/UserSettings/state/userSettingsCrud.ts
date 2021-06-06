
import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../../utils'

export const USER_PROFILE_URL = `${API_URL}/api/v1/user_profile`
export const UPDATE_PROFILE_URL = `${API_URL}/api/v1/update_profile`
export const SETTINGS_URL = `${ API_URL }/api/v1/settings`
export const USERS_URL = `${ API_URL }/api/v1/users/`

/**
 * GET method to fetch the User Settings sending the optionsHeader in the call
 * @param SETTINGS_URL, optionsHeaders
 * @returns User Settings Data
 */
export const getUserSettings = () => {
  return axios.get(SETTINGS_URL, optionsHeaders())
}

/**
 * GET method to fetch the User Profile sending the optionsHeader in the call
 * @param USER_PROFILE_URL, optionsHeaders
 * @returns User Profile Data
 */
export const getUserProfile = () => {
  return axios.get(USER_PROFILE_URL,  optionsHeaders())
}

/**
 * GET method to fetch all the Users sending the optionsHeader in the call
 * @param USERS_URL, optionsHeaders
 * @returns List of all Users
 */
export const getUsers = () => {
    return axios.get(USERS_URL, optionsHeaders())
}

/**
 * POST method to update profile sending the optionsHeader in the call
 * @param UPDATE_PROFILE_URL, optionsHeaders
 * @returns User Settings Data
 */
export const updateProfile = (username:string, email:string, password:string) => {
    const formData = new FormData()
    formData.append("user[username]", username);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    return axios.post(UPDATE_PROFILE_URL, formData, optionsHeaders())
}

export const createSettings = (data: any) => {
    const form = {
        user: data
    }

    return axios.post(SETTINGS_URL, form, optionsHeaders());
}