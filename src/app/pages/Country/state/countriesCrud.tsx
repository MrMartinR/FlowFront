import axios from 'axios'
import store from '../../../../redux/store'
import { API_URL, optionsHeaders } from '../../../utils'

export const COUNTRY_URL = `${API_URL}/api/v1/countries`
// READ
export const getAllCountries = () => {
  return axios.get(COUNTRY_URL, optionsHeaders())
}

export const getCountryById = (countryId: any) => {
  return axios.get(`${COUNTRY_URL}/${countryId}`, optionsHeaders())
}

// CREATE =>  POST: add a new country to the server
export const createCountry = (data: any) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    country: data,
  }

  return axios.post(`${COUNTRY_URL}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}

// UPDATE => PUT: update the country on the server
export const updateCountry = (data: any, id: any) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  const form = {
    country: data,
  }
  return axios.put(`${COUNTRY_URL}/${id}`, form, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}

// DELETE => delete the country from the server
export const deleteCountry = (id: any) => {
  const {
    auth: { user, client, expiry, token },
  } = store.getState()
  return axios.delete(`${COUNTRY_URL}/${id}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': token,
      'token-type': 'Bearer',
      client,
      expiry,
      uid: user.uid,
    },
  })
}