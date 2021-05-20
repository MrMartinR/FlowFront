import * as requestFromServer from './accountsCrud'
import { accountsSlice, callTypes } from './accountsSlice'

const { actions } = accountsSlice

/**
 * Fetch all accounts
 */
export const fetchAccounts = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getAllAccounts()
    .then((response) => {
      const { data } = response
      dispatch(actions.accountsFetched(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Accounts"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}


/**
 * Fetch individual accounts
 * @param id
 */
export const fetchAccount = (id: any) => (dispatch: any) => {
  /**
   * If no pass id as parameter returns an error
   * @return error = "Can't find Account without id"
   * */
  if (!id) {
    let error = "Can't find Account without id"
    return dispatch(actions.catchError({ error, callType: callTypes.action }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getAccountById(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.accountFetched(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/**
 * Create an account
 * @param data
 */
export const createAccount = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createAccount(data)
    .then((response) => {
      const { data } = response
      dispatch(actions.accountCreated(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't create account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/**
 * Update an account
 * @param data
 */
export const updateAccount = (data: any, id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateAccount(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.accountUpdated(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't update account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/*
 * delete an account
 * id: this will be account is
 * deleteAccount to trigger the promise
 */
export const deleteAccount = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .deleteAccount(id)
    .then((response) => {
      const { data } = response
      const returnedTarget = {...data, itm:id}
      dispatch(actions.accountDeleted(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't find country"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}