import { userPlatformsSlice, callTypes } from './userPlatformsSlice'
import * as requestFromServer from './userPlatformsCrud'
const { actions } = userPlatformsSlice

/* Fetches a list of user platforms */
export const fetchUserPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall(callTypes.list))
  requestFromServer
    .getAllUserPlatforms()
    .then((response) => {
      const { data } = response;
      return dispatch(actions.userPlatformsReceived(data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}

/* Fetches the details of a single user platform */
export const fetchUserPlatformDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(callTypes.action))
  requestFromServer
  .getUserPlatformById(id)
    .then((response) => {
      return dispatch(actions.userPlatformDetailsReceived(response.data))
    })
    .catch((error) => {
      return dispatch(actions.catchError(error))
    })
}
