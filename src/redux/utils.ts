import store from './store'

/**
 * Asigns the API_URL depending on the environment
 *
 * @remarks
 * Note the localhost is not using SSL
 *
 * @param x - The first input number
 * @param y - The second input number
 * @returns localhost:3001 or api.flowfin.tech
 *
 * 
 */


/**
 * Asigns the API_URL depending on the environment
 *
 * @remarks
 * Note the localhost is not using SSL
 *
 * @returns http://localhost:3001 or https://api.flowfin.tech
 *
 * @author 
 * Martin
 */

let _API_URL
let _FORGOT_PASSWORD_CALLBACK

if (process.env.NODE_ENV === 'development') {
  _API_URL = 'http://localhost:3001'
  _FORGOT_PASSWORD_CALLBACK = 'http://localhost:3000'
}

if (process.env.NODE_ENV === 'production') {
  _API_URL = 'https://api.flowfin.tech'
  _FORGOT_PASSWORD_CALLBACK = 'https://app.flowfin.tech'
}

export const API_URL = _API_URL
export const FORGOT_PASSWORD_CALLBACK = _FORGOT_PASSWORD_CALLBACK


/**
 * Authentication Headers to call the API
 *
 * @remarks
 *
 * @returns 
 *
 * @author 
 * James
 */

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