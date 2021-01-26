import axios from 'axios';
import { any } from 'prop-types';

import { optionsHeaders  } from '../../../../redux/utils'
import { USER_PLATFORMS_URL } from './userPlatformsCrud'
import { userPlatformsSlice } from './userPlatformsSlice'


const { actions } = userPlatformsSlice;

// Fetches a list of user platforms
export const fetchUserPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(USER_PLATFORMS_URL, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.userPlatformsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

// Fetches the details of a single user platform
// export const fetchUserPlatformDetails = (id: any) => (dispatch: any) => {
//   dispatch(actions.startCall(any))
//       axios.get(`${USER_PLATFORMS_URL}/${id}`, optionsHeaders())
//       .then(function (response) {
//           return dispatch(actions.platformDetailsReceived(response.data));
//       })
//       .catch(function (error) {
//           return dispatch(actions.catchError(error));
//       });
// }





