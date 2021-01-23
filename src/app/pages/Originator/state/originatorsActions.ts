import axios from 'axios';
import { originatorsSlice } from './originatorsSlice'
import { optionsHeaders, API_URL } from '../../../../redux/utils'


const ORIGINATORS_URL = `${API_URL}/api/v1/originators`

const { actions } = originatorsSlice;

export const fetchOriginatorsList = () => (dispatch: any) => {
  dispatch(actions.startCall())
      axios.get(ORIGINATORS_URL, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.originatorsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}
