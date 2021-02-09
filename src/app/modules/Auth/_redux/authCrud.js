/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import { API_URL, FORGOT_PASSWORD_CALLBACK } from '../../../utils'

// export const API_URL = _API_URL
export const LOGIN_URL = `${API_URL}/api/v1/auth/sign_in`
export const REGISTER_URL = `${API_URL}/api/v1/auth`
export const REQUEST_PASSWORD_URL = `${API_URL}/api/v1/auth/password`
export const SUBMIT_PASSWORD_URL = `${API_URL}/api/v1/auth/password`

/**
 * @rev this Global Variable
 */
export const ME_URL = 'api/me'

export function login(email, password) {
  return axios.post(
    LOGIN_URL,
    { user: { email, password } },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

export function registration(email, fullname, username, password) {
  return axios.post(REGISTER_URL, {
    user: {
      email,
      fullname,
      username,
      password,
    },
  })
}

export function requestPassword(email, redirectUrl) {
  console.log(`REQUESTPASSWORD-- ${REQUEST_PASSWORD_URL}`)
  redirectUrl = `${FORGOT_PASSWORD_CALLBACK}/auth/forgot-password-actions`
  return axios.post(REQUEST_PASSWORD_URL, { email, redirectUrl })
}

export function submitRequestPassword(password, passwordConfirmation, accessToken, client, uid, expiry) {
  console.log(`submitRequestPassword-- ${accessToken}`)

  return axios.put(
    SUBMIT_PASSWORD_URL,
    { password, passwordConfirmation },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': accessToken,
        client,
        uid,
        expiry,
      },
    }
  )
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL)
}
