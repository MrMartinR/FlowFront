import * as requestFromServer from './userAccountsCrud'
import { callTypes, userAccountsSlice } from './userAccountsSlice'

const { actions } = userAccountsSlice

/* Fetches a list of User Accounts */
export const fetchUserAccountsList = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  requestFromServer
  .getAllUserAccounts()
    .then((response) => {
      return dispatch(actions.userAccountsReceived(response.data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}

export const fetchuserAccount = (id: any) => (dispatch: any) => {
  if (!id) {
    let error = "Can't find User Account without id"
    return dispatch(actions.catchError({ error, callType: callTypes.action }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getUserAccountById(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.userAccountReceived(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteUserAccount = (userAccountId:string) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .deleteUserAccount(userAccountId)
    .then((response) => {
      const { data } = response
      const id = { itm: userAccountId }
      const returnedTarget = Object.assign(data, id)
      dispatch(actions.userAccountDelete(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const createUserAccount = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  console.log('actions')
  return requestFromServer
    .createUserAccount(data)
    .then((response) => {
      const { data } = response
      console.log(response)
      dispatch(actions.userAccountCreate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't create userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const updateUserAccount = (data: any, id:string) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateUserAccount(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.userAccountUpdate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't update userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const fetchAccountTransaction = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getUserTransactions(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.userAccountTransactions(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const fetchAccountTransactionById = (userId: string, transactionId:string) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getUserTransactionById(userId, transactionId)
    .then((response) => {
      const { data } = response
      dispatch(actions.userAccountTransactions(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find userAccount"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const createTransaction = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
  .createUserTransaction(data)
  .then((response) => {
    const { data } = response
    console.log(response)
    dispatch(actions.transactionCreate(data))
  })
  .catch((error) => {
    error.clientMessage = "Can't create userTransaction"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
  }
  export const updateTransaction = (data: any, transactionId:string) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateUserTransaction(data, transactionId)
    .then((response) => {
      const { data } = response
      dispatch(actions.transactionUpdate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't update userTransaction"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
  }
  export const deleteUserTransaction = (transactionId:string) => (dispatch: any) => {
    dispatch(actions.startCall({ callType: callTypes.action }))
    return requestFromServer
    .deleteUserTransaction(transactionId)
    .then((response) => {
      const { data } = response
      const id = { itm: transactionId }
      const returnedTarget = Object.assign(data, id)
      dispatch(actions.transactionDelete(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't delete userTransaction"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
  }
  
  export const resetSuccess = () => (dispatch: any) => {
    dispatch( actions.resetSuccess({ success: null }));
  }