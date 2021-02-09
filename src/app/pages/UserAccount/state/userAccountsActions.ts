import axios from 'axios'
import { any } from 'prop-types'
import * as requestFromServer from './userAccountsCrud'
// import { userAccountsSlice, callTypes } from './userAccountsSlice'
import { userAccountsSlice } from './userAccountsSlice'

import { optionsHeaders } from '../../../utils'
import { USER_ACCOUNTS_URL } from './userAccountsCrud'

const { actions } = userAccountsSlice

/* Fetches a list of User Accounts */
export const fetchUserAccountsList = () => (dispatch: any) => {
  dispatch(actions.startCall(any))
  axios
    .get(USER_ACCOUNTS_URL, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.userAccountsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

// const getUserAccounts = (headerPara) =>
//   axios.get(`${API_URL}/api/v1/user_accounts`, {
//     headers: {
//       'access-token': headerPara.authToken,
//       client: headerPara.client,
//       uid: headerPara.user.fullname,
//       expiry: headerPara.expiry,
//     },
//   })

// export default getUserAccounts

// export const userAccountSort = (queryParams) => (dispatch) => {
//   const { field, isAsc, entities } = queryParams
//   // console.log('fieldXXX', field)
//   dispatch(
//     actions.userAccountSort({
//       callType: callTypes.action,
//       field,
//       isAsc,
//       entities,
//     })
//   )
// }
// export const fetchUserAccounts = (params) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer
//     .findUserAccounts(params)
//     .then((response) => {
//       const { data } = response
//       dispatch(actions.userAccountsFetched({ data }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find userAccounts"
//       dispatch(actions.catchError({ error, callType: callTypes.list }))
//     })
// }

// // This works similar to fetchuserAccounts. The difference is that rather than replacing existing data,
// // its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
// export const fetchNextUserAccounts = (params) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.list }))
//   return requestFromServer
//     .findNextUserAccounts(params)
//     .then((response) => {
//       const { pages, page, entities } = response.data
//       dispatch(actions.userAccountsAppend({ pages, page, entities }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find more userAccounts"
//       dispatch(actions.catchError({ error, callType: callTypes.list }))
//     })
// }

// export const fetchuserAccount = (id) => (dispatch) => {
//   if (!id) {
//     return dispatch(actions.userAccountFetched({ userAccountForEdit: undefined }))
//   }

//   dispatch(actions.startCall({ callType: callTypes.action }))
//   console.log('Looking')
//   return requestFromServer
//     .getUserAccountById(id)
//     .then((response) => {
//       const userAccount = response.data.data[0]
//       dispatch(actions.userAccountFetched({ userAccountForEdit: userAccount }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find userAccount"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }

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

// export const fetchAccountTransaction = (id) => (dispatch) => {
//   dispatch(actions.startCall({ callType: callTypes.action }))
//   return requestFromServer
//     .getUserTransactions(id)
//     .then((response) => {
//       const userAccountTransactions = response.data.data
//       dispatch(actions.userAccountTransactions({ userAccountTransactions }))
//     })
//     .catch((error) => {
//       error.clientMessage = "Can't find userAccount"
//       dispatch(actions.catchError({ error, callType: callTypes.action }))
//     })
// }
