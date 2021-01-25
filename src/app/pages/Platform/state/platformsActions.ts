import axios from 'axios'
import { any } from 'prop-types'

import { optionsHeaders } from '../../../../redux/utils'
import { PLATFORMS_URL } from './platformsCrud'
import { platformsSlice } from './platformsSlice'

const { actions } = platformsSlice

export const fetchPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall(any))
  axios
    .get(PLATFORMS_URL, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.platformsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const fetchPlatformDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
  axios
    .get(`${PLATFORMS_URL}/${id}`, optionsHeaders())
    .then(function (response) {
      return dispatch(actions.platformDetailsReceived(response.data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}
