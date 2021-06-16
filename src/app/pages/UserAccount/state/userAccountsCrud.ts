import axios from 'axios';
import { API_URL, optionsHeaders } from '../../../utils'

/**
 * This is the main API endpoint for user_accounts
 * @returns https://app.flowfin.tech/api/v1/user_accounts or
 * http://localhost:3000/api/v1/user_accounts
 */
export const USER_ACCOUNTS_URL = `${API_URL}/api/v1/user_accounts`
export const TRANSACTIONS_URL = `${API_URL}/api/v1/transactions`
/**
 * GET method to fetch all the User Accounts sending the optionsHeader in the call
 * @param USER_ACCOUNTS_URL, optionsHeaders
 * @returns List of all the User Accounts
 */
 export const getAllUserAccounts = () => {
    return axios.get(USER_ACCOUNTS_URL, optionsHeaders());
  }

  /**
 * GET method to fetch individual User Account sending the optionsHeader in the call
 * @param USER_ACCOUNTS_URL, contactsId, optionsHeaders
 * @returns Data about a specific User Account
 */
export const getUserAccountById = (id: string) => {
    return axios.get(`${USER_ACCOUNTS_URL}/${id}`, optionsHeaders())
  }
/**
 * MEtodo POST para crear unha nova user_account
 * @param data 
 * @returns os datos da user_account creada
 */
export const createUserAccount = (data:any) => {
  const form = {
    user_account: data,
  }

  return axios.post(`${USER_ACCOUNTS_URL}`, form, optionsHeaders())
}
/**
 * MEtodo PUT para actualizar os datos dunha user account dada por id
 * @param data 
 * @param id 
 * @returns a user account actualizada
 */
export const updateUserAccount = (data:any, id:string) => {
  const form = {
    user_account: data,
  }
  return axios.put(`${USER_ACCOUNTS_URL}/${id}`, form, optionsHeaders())
}
/**
 * MEtodo DELETE para borrar unha user_account
 * @param id 
 * @returns a resposta do DELETE
 */
export const deleteUserAccount = (id: string) => {
  return axios.delete(`${USER_ACCOUNTS_URL}/${id}`, optionsHeaders())
}

/**
 * Metodo GET para obtener todas las transactions de un user_account concreto
 * @param id 
 * @returns lista de transactions 
 */
export const getUserTransactions = (id:string) => {
    return axios.get(`${USER_ACCOUNTS_URL}/${id}/transactions`, optionsHeaders());
}
/**
 * Metodo GET para obtener una transaction individual
 * @param user_id
 * @param transaction_id 
 * @returns detalles de la transaction
 */
export const getUserTransactionById = (user_id:string, transaction_id:string) => {
  return axios.get(`${TRANSACTIONS_URL}/${transaction_id}`, optionsHeaders())
}
/**
 * Metodo POST que crea una nueva transaction para un user_account concreto
 * @param data 
 * @returns La nueva transaction creada
 */
export const createUserTransaction = (data: any) => {
    const form = {
      transaction: data,
    }
  
    return axios.post(`${TRANSACTIONS_URL}`, form, optionsHeaders())
  }
/**
 * Metodo PUT para modificar los datos de una transaction
 * @param data 
 * @param id 
 * @returns La transaction actualizada
 */
export const updateUserTransaction = (data: any, transaction_id: string) => {
  const form = {
    transaction: data,
  }

  return axios.put(`${TRANSACTIONS_URL}/${transaction_id}`, form, optionsHeaders())
}
/**
 * MEtodo DELETE para borrar una transaction
 * @param id 
 * @returns respuesta de la operación
 */
export const deleteUserTransaction = (transaction_id:string) => {
  return axios.delete(`${TRANSACTIONS_URL}/${transaction_id}`, optionsHeaders())
}