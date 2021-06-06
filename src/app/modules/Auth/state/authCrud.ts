/* eslint-disable no-underscore-dangle */
import axios from 'axios'
import { API_URL, FORGOT_PASSWORD_CALLBACK, optionsHeaders } from '../../../utils'

// export const API_URL = _API_URL
export const LOGIN_URL = `${API_URL}/api/v1/auth/sign_in`
export const REGISTER_URL = `${API_URL}/api/v1/auth`
export const PASSWORD_URL = `${API_URL}/api/v1/auth/password`
export const LOGOUT_URL = `${API_URL}/api/v1/auth/sign_out`

export const login = (username: string, password: string) => {
  const form = {
    user: { username, password },
  }
  return axios.post(`${ LOGIN_URL }`, form,{
      headers: { 'Content-Type': 'application/json' },
    })
}

export const logout = () => {
  return axios.delete(`${ LOGOUT_URL }`, optionsHeaders())
}

export const registration = (email: string, name:string, username:string, password:string, country_id: string) => {
  const form = {
    data:{
      attributes: {
        email,
        name,
        username,
        password,
        country_id
      }
    }
  }
  return axios.post(`${REGISTER_URL}`, form, {
      headers: { 'Content-Type': 'application/json' },
    })
}

export const requestPassword = (email: string) => {
  const redirect_url = `${FORGOT_PASSWORD_CALLBACK}/auth/forgot-password-actions/`
  const form = {
      email,
      redirect_url,
  }
  return axios.post(`${ PASSWORD_URL }`, form, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const submitRequestPassword = (password: string, password_confirmation:string, token: string, client:string, uid:string, expiry:string) => {
  const form = {
    password,
    password_confirmation,
  }

  return axios.put(
    `${ PASSWORD_URL }`, form, {
      headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': token,
        'token-type': 'Bearer',
        client,
        expiry,
        uid: uid,
      },
    }
  )
}