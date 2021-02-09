import axios from 'axios'
import { loansSlice } from './loansSlice'
import { optionsHeaders } from '../../../utils'
import { LOANS_URL } from './loansCrud'

const { actions } = loansSlice

export const fetchLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall())
  axios
    .get(LOANS_URL, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.loansReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const fetchLoanDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall())
  axios
    .get(`${LOANS_URL}/${id}`, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.loanDetailsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}
