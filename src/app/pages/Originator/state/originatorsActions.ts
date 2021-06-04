import { originatorsSlice } from './originatorsSlice'
import * as requestFromServer from './originatorsCrud'
const { actions } = originatorsSlice
/* Fetches a list of originators */
export const fetchOriginatorsList = () => (dispatch: any) => {
  dispatch(actions.startCall())
  requestFromServer
  .getAllOriginators()
    .then(function (response) {
      const { data } = response;
      return dispatch(actions.originatorsReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

/* Fetches the details of a single originator */
export const fetchOriginatorDetails = (id: any) => (dispatch: any) => {
  if (!id) {
    const error = "Can't find Originator without id"
    return dispatch(actions.catchError(error))
  }
  dispatch(actions.startCall())
   return requestFromServer
   .getOriginatorById(id)
    .then((response) => {
      console.log(JSON.stringify(response))
      const { data } = response
      dispatch(actions.originatorDetailsReceived(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Originator"
      dispatch(actions.catchError(error))
    })
}

/* Fetches a list of loans associated to a particular originator */
export const fetchOriginatorLoans = (id: any) => (dispatch: any) => {
  if (!id) {
    const error = "Can't find loans associated to a particular originator without originator_id"
    return dispatch(actions.catchError(error))
  }
  dispatch(actions.startCall())
  requestFromServer
    .getPlatformLoans(id)
    .then((response) => {
      const { data } = response
      return dispatch(actions.originatorLoansReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}


export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}