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
      dispatch(actions.accountsFetched({ data }))
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
      let account = response.data
      dispatch(actions.accountFetched({ account }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/**
 * Create an account
 * @param accountForCreation
*/ 
export const createAccount = (accountForCreation: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createAccount(accountForCreation)
    .then((response) => {
      const { account } = response.data
      dispatch(actions.accountCreated({ account }))
    })
    .catch((error) => {
      error.clientMessage = "Can't create account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/**
 * Update an account
 * @param account
*/ 
export const updateAccount = (account: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateAccount(account)
    .then(() => {
      dispatch(actions.accountUpdated({ account }))
    })
    .catch((error) => {
      error.clientMessage = "Can't update account"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

