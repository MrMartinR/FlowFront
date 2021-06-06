import { userOriginatorsSlice } from './userOriginatorsSlice'
import * as requestFromServer from './userOriginatorsCrud'
const { actions } = userOriginatorsSlice

export const fetchUserOriginatorsData = () => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
  .getAllUserOriginators()
    .then((response) => {
      const { data } = response;
      return dispatch(actions.userOriginatorsReceived(data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}

export const fetchUserOriginatorDetails = (originator_id: any) => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
    .getUserOriginatorById(originator_id)
    .then((response) => {
      const { data } = response;
      return dispatch(actions.userOriginatorDetailsReceived(data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}
export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}