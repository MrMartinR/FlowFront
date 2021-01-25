import store from '../../../../redux/store'

export const optionsHeaders = () => {
  const {
    auth: { user, client, expiry, token }
  } = store.getState()

  const options = {
    headers: {
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.email
    }
  }
  return options
}

// TODO: define a system to get the right url depending of the environment and place it in a global scope?
let API_URL
if (process.env.NODE_ENV === 'development') {
  API_URL = 'http://localhost:3001'
} else if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.flowfin.tech'
}

// let API_URL = "https://api.flowfin.tech";

// the API endpoint
export const ORIGINATORS_URL = `${API_URL}/api/v1/originators`

// // READ
// export function getPlatforms() {
//   return axios.get(PLATFORMS_URL,  optionsHeaders())
// }
