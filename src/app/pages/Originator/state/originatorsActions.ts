import axios from 'axios';
import { optionsHeaders, ORIGINATORS_URL } from './originatorsCRUD'
import { originatorsSlice } from './originatorsSlice'

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
