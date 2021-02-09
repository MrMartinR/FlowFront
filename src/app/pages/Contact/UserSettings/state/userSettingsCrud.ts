import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../../utils'

/**
 * This is the main API endpoint for User Settings
 * @returns https://app.flowfin.tech/api/v1/user_profile or
 * http://localhost:3000/api/v1/user_profile
 */
export const USER_SETTINGS_URL = `${API_URL}/api/v1/user_profile`

// /**
//  * GET method to fetch the User Settings sending the optionsHeader in the call
//  * @param USER_SETTINGS_URL, optionsHeaders
//  * @returns User Settings Data
//  */
// export function getUserSettings() {
//   return axios.get(USER_SETTINGS_URL, optionsHeaders())
// }

// export const updateProfile = (headerPara: any, details: any, fileName: any = false) => {
//     const formData = new FormData()
//     Object.entries(details).forEach(([key, value]) => {
//       if (key) {
//         const data: any = value
//         if (fileName) {
//           formData.append(`user[${key}]`, data, fileName)
//         } else {
//           formData.append(`user[${key}]`, data)
//         }
//       }
//     })
//     return axios.post(`${API_URL}/api/v1/update_profile`, formData, {
//       headers: {
//         'access-token': headerPara.authToken,
//         client: headerPara.client,
//         uid: headerPara.user.fullname,
//         expiry: headerPara.expiry,
//       },
//     })
//   }

// export const getUserProfile = (headerPara: any) =>
//   axios.get(`${API_URL}/api/v1/user_profile`, {
//     headers: {
//       'access-token': headerPara.authToken,
//       client: headerPara.client,
//       uid: headerPara.user.fullname,
//       expiry: headerPara.expiry,
//     },
//   })
