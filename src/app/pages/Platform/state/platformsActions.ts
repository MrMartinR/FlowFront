import * as requestFromServer from './platformsCrud'
import { platformsSlice } from './platformsSlice'

const { actions } = platformsSlice

/* Fetches a list of platforms */
export const fetchPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall())
  return requestFromServer
  .getAllPlatforms()
    .then((response) => {
      const { data } = response
      dispatch(actions.platformsReceived(data))
    })
    .catch((error) => {
      dispatch(actions.catchError(error))
    })
}

/* Fetches the details of a single platform */
export const fetchPlatformDetails = (id: any) => (dispatch: any) => {
  if (!id) {
    const error = "Can't find Platform without id"
    return dispatch(actions.catchError(error))
  }
  dispatch(actions.startCall())
   return requestFromServer
   .getPlatformById(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.platformDetailsReceived(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Platform"
      dispatch(actions.catchError(error))
    })
}

/* Fetches a list of originators associated to a particular platform */
export const fetchPlatformOriginators = (id: any) => (dispatch: any) => {
  if (!id) {
    const error = "Can't find originators associated to a particular platform without platform_id"
    return dispatch(actions.catchError(error))
  }
  dispatch(actions.startCall())
  return requestFromServer
  .getPlatformOriginators(id)
    .then((response) => {
      const { data } = response
      dispatch(actions.platformOriginatorsReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

/* Fetches a list of loans associated to a particular platform */
export const fetchPlatformLoans = (id: any) => (dispatch: any) => {
  if (!id) {
    const error = "Can't find loans associated to a particular platform without platform_id"
    return dispatch(actions.catchError(error))
  }
  dispatch(actions.startCall())
  requestFromServer
    .getPlatformLoans(id)
    .then((response) => {
      const { data } = response
      return dispatch(actions.platformLoansReceived(data))
    })
    .catch(function (error) {
      return dispatch(actions.catchError(error))
    })
}

export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}
