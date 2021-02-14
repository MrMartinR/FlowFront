import axios from 'axios'
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for contacts
 * @returns https://app.flowfin.tech/api/v1/contacts or
 * http://localhost:3000/api/v1/contacts
 */
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`

/**
 * GET method to fetch all the Contacts sending the optionsHeader in the call
 * @param CONTACTS_URL, optionsHeaders
 * @returns List of all the Contacts
 */
export function getAllContacts() {
  return axios.get(CONTACTS_URL, optionsHeaders())
}

/**
 * GET method to fetch individual Contact sending the optionsHeader in the call
 * @param CONTACTS_URL, contactsId, optionsHeaders
 * @returns Data about a specific Contact
 */
export function getContactById(contactId: any) {
  return axios.get(`${CONTACTS_URL}/${contactId}`, optionsHeaders())
}
