import axios from 'axios';
import { any } from 'prop-types';
import { optionsHeaders, API_URL } from '../../../../redux/utils'
import { platformsSlice } from './platformsSlice'


const { actions } = platformsSlice;
const PLATFORMS_URL = `${API_URL}/api/v1/platforms`

export const fetchPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(PLATFORMS_URL, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.platformsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

export const fetchPlatformDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(`${PLATFORMS_URL}/${id}`, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.platformDetailsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}


