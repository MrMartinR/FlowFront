import { loansSlice, callTypes } from './loansSlice'
import * as requestFromServer from './loansCrud'
const { actions } = loansSlice

export const fetchLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  requestFromServer
  .getAllLoans()
    .then(function (response) {
      const { data } = response;
      return dispatch(actions.loansReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchLoanDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  requestFromServer
  .getLoanById(id)
    .then(function (response) {
      const { data } = response;
      return dispatch(actions.loanDetailsReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/*
 * update the loan
 * data: from the edit submission form
 * updateLoan to trigger the promise
 * loanUpdate to update the state
 */
export const updateLoan = (data: any, id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateLoan(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.loanUpdate(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find loan"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/*
 * delete a loan
 * id: this will be loan is
 * deleteLoan to trigger the promise
 */
export const deleteLoan = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  let loanId = id
  return requestFromServer
    .deleteLoan(loanId)
    .then((response) => {
      const { data } = response
      const id = { itm: loanId }
      const returnedTarget = Object.assign(data, id)
      dispatch(actions.loanDelete(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't find loan"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}