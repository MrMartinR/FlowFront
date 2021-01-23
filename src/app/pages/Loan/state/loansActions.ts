import axios from 'axios';
import { loansSlice } from './loansSlice'
import { optionsHeaders, API_URL } from '../../../../redux/utils'


const LOANS_URL = `${API_URL}/api/v1/loans`

const { actions } = loansSlice;

export const fetchLoansData = () => (dispatch: any) => {
  dispatch(actions.startCall())
      axios.get(LOANS_URL, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.loansReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}
