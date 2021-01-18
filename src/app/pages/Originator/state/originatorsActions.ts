import axios from 'axios';
import { optionsHeaders, ORIGINATORS_URL } from './originatorsCRUD'
import { originatorsSlice } from './originatorsSlice'

const { actions } = originatorsSlice;

export const fetchOriginatorsList = () => (dispatch: any) => {
  dispatch(actions.startCall())
      axios.get(ORIGINATORS_URL, optionsHeaders())
      .then(function (response) {
        console.log(response)
          return dispatch(actions.originatorsReceived(response.data));
      })
      .catch(function (error) {
        console.log(error)
          return dispatch(actions.catchError(error));
      });
}
