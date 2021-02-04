import axios from 'axios'
import { originatorsSlice } from './originatorsSlice'
import { optionsHeaders } from '../../../../redux/utils'
import { ORIGINATORS_URL } from './originatorsCrud'

const { actions } = originatorsSlice

export const fetchOriginatorsList = () => (dispatch: any) => {
  dispatch(actions.startCall())
  axios
    .get(ORIGINATORS_URL, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.originatorsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}
