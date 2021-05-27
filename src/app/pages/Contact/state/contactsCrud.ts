import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for contacts
 * @returns https://app.flowfin.tech/api/v1/contacts or
 * http://localhost:3000/api/v1/contacts
 */
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`
export const CONTACT_METHODS_URL = `${API_URL}/api/v1/contact_methods`
/**
 * GET method to fetch all the Contacts sending the optionsHeader in the call
 * @param CONTACTS_URL, optionsHeaders
 * @returns List of all the Contacts
 */
export const getAllContacts = () => {
  return axios.get(CONTACTS_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Contact sending the optionsHeader in the call
 * @param CONTACTS_URL, contactsId, optionsHeaders
 * @returns Data about a specific Contact
 */
export const getContactById = (contactId: any) => {
  return axios.get(`${CONTACTS_URL}/${contactId}`, optionsHeaders())
}

/*
 * promise function to process the axios post given data
 * sends header/ authorization
 */
export const createContact = (data: any) => {
  const form = {
    contact: data,
  }

  return axios.post(`${CONTACTS_URL}`, form, optionsHeaders())
}

/*
 * promise function to process the axios puts given data
 * sends header/ authorization
 */
export const updateContact = (data: any, id: any) => {
  const form = {
    contact: data,
  }

  return axios.put(`${CONTACTS_URL}/${id}`, form, optionsHeaders())
}
/*

*/
export const deleteContact = (id: any) => {
  return axios.delete(`${CONTACTS_URL}/${id}`, optionsHeaders())
}


/*
 * promise function to process the axios post given data
 * sends header/ authorization
 */
export const createContactMethods = (data: any) => {
  const form = {
    contact_method: data,
  }

  return axios.post(`${CONTACT_METHODS_URL}`, form, optionsHeaders())
}
/*
 * promise function to process the axios puts given data
 * sends header/ authorization
 */
export const updateContactMethods = (data: any, id: any) => {
  const form = {
    contact_method: data,
  }

  return axios.put(`${CONTACT_METHODS_URL}/${id}`, form, optionsHeaders())
}
/*

*/
export const deleteContactMethod = (id: any) => {
  return axios.delete(`${CONTACT_METHODS_URL}/${id}`, optionsHeaders())
}
