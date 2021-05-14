import { userLoansSlice } from './userLoansSlice'
import * as requestFromServer from './userLoansCrud'
const { actions } = userLoansSlice

export const fetchUserLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
  .getAllUserLoans()
    .then((response) => {
      const { data } = response;
      return dispatch(actions.userLoansReceived(data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}

export const fetchUserLoanDetails = (loan_id: any) => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
    .getUserLoanById(loan_id)
    .then((response) => {
      const { data } = response;
      return dispatch(actions.userLoanDetailsReceived(data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}
export const resetSuccessUserLoans = () => (dispatch: any) => {
  dispatch( actions.userLoansResetSuccess({ success: null }));
}