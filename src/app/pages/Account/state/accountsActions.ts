import * as requestFromServer from './accountsCrud'
import { accountsSlice, callTypes } from './accountsSlice'

const { actions } = accountsSlice

// fetch all accounts
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

// get a single account
export const fetchAccount = (id: any) => (dispatch: any) => {
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
