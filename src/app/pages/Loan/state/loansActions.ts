import axios from 'axios';
import { optionsHeaders, LOANS_URL } from './loansCRUD'
import { loansSlice } from './loansSlice'

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
