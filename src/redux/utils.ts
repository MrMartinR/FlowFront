import store from './store'


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


let _API_URL
let _FORGOT_PASSWORD_CALLBACK

if (process.env.NODE_ENV === 'development') {
  // _API_URL = 'http://localhost:3001'
  // _FORGOT_PASSWORD_CALLBACK = 'http://localhost:3000'

  _API_URL = 'https://api.flowfin.tech'
  _FORGOT_PASSWORD_CALLBACK = 'https://app.flowfin.tech'
}

if (process.env.NODE_ENV === 'production') {
  _API_URL = 'https://api.flowfin.tech'
  _FORGOT_PASSWORD_CALLBACK = 'https://app.flowfin.tech'
}

export const API_URL = _API_URL
export const FORGOT_PASSWORD_CALLBACK = _FORGOT_PASSWORD_CALLBACK

