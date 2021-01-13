import store from './store'


// Backend API BASE URL
export const API_URL = 'https://api.flowfin.tech'
// export const API_URL = 'https://localhost:3001'

// Authentication headers
export const optionsHeaders = () => {
    const {
      auth: {
        user, client, expiry, token,
      },
    } = store.getState()
  
    const options = {
      headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': token,
        'token-type': 'Bearer',
        client,
        expiry,
        uid: user.email,
      },
    }
    return options
}