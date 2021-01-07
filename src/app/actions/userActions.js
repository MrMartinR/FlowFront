import axios from "axios"
import { API_URL } from "../modules/Auth/_redux/authCrud"

export const updateProfile = (headerPara, details, fileName = false) => {
  const formData = new FormData()
  Object.entries(details).forEach(([key, value]) => {
    if (key) {
      const data = value
      if (fileName) {
        formData.append(`user[${key}]`, data, fileName)
      } else {
        formData.append(`user[${key}]`, data)
      }
    }
  })
  return axios.post(`${API_URL}/api/v1/update_profile`, formData, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  })
}

export const getUserProfile = (headerPara) =>
  axios.get(`${API_URL}/api/v1/user_profile`, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  })
