import { loansSlice } from './loansSlice'
import * as requestFromServer from './loansCrud'
const { actions } = loansSlice

export const fetchLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
  .getAllLoans()
    .then(function (response) {
      const { data } = response;
      return dispatch(actions.loansReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const fetchLoanDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
  .getLoanById(id)
    .then(function (response) {
      const { data } = response;
      return dispatch(actions.loanDetailsReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}