import axios from 'axios'
import {API_URL} from  '../../../../redux/utils'
import {optionsHeaders} from '../../../../redux/utils'


// the API endpoint
export const CONTACTS_URL = `${API_URL}/api/v1/contacts`

// READ
export function getAllContacts() {
  return axios.get(CONTACTS_URL,  optionsHeaders())
}

export function getContactById(contactsId: any) {
  return axios.get(`${CONTACTS_URL}/${contactsId}`, optionsHeaders())
}



