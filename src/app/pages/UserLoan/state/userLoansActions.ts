import axios from 'axios'
import { userLoansSlice } from './userLoansSlice'
import { optionsHeaders } from '../../../../redux/utils'
import { USER_LOANS_URL } from './userLoansCrud'

const { actions } = userLoansSlice

export const fetchUserLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall())
  axios
    .get(USER_LOANS_URL, optionsHeaders())
    .then(function (response) {
      console.log(response)
      return dispatch(actions.userLoansReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const fetchUserLoanDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall())
  axios
    .get(`${USER_LOANS_URL}/${id}`, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.userLoanDetailsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}
