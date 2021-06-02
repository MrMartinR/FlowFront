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

// export const deleteUserAccount = (id) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .deleteUserAccount(id)
//     .then((response) => {
//       dispatch(actions.userAccountDeleted({ id, response }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't delete userAccount"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

// export const createUserAccount = (userAccountForCreation) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .createUserAccount(userAccountForCreation)
//     .then((response) => {
//       const { userAccount } = response.data
//       dispatch(actions.userAccountCreated({ userAccount }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't create userAccount"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

// export const updateUserAccount = (userAccount) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .updateUserAccount(userAccount)
//     .then(() => {
//       dispatch(actions.userAccountUpdated({ userAccount }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't update userAccount"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

// export const updateUserAccountsStatus = (ids, status) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .updateStatusForUserAccounts(ids, status)
//     .then(() => {
//       dispatch(actions.userAccountsStatusUpdated({ ids, status }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't update userAccounts status"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

// export const deleteUserAccounts = (ids) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .deleteUserAccounts(ids)
//     .then(() => {
//       dispatch(actions.userAccountsDeleted({ ids }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't delete userAccounts"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

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
export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}
