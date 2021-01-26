import axios from 'axios';
import { any } from 'prop-types';

import { optionsHeaders  } from '../../../../redux/utils'
import { PLATFORMS_URL } from './platformsCrud'
import { platformsSlice } from './platformsSlice'


const { actions } = platformsSlice;

// Fetches a list of platforms
export const fetchPlatformsList = () => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(PLATFORMS_URL, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.platformsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

// Fetches the details of a single platform
export const fetchPlatformDetails = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(`${PLATFORMS_URL}/${id}`, optionsHeaders())
      .then(function (response) {
          return dispatch(actions.platformDetailsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

// Fetches the contact associated to a particular platform
export const fetchPlatformContact = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(`${PLATFORMS_URL}/${id}/platform_contact`, optionsHeaders())
    //   axios.get(`${PLATFORMS_URL}/platform_contact/${id}`, optionsHeaders())
      .then(function (response) {
          console.log(id)
          console.log(response.data)
          return dispatch(actions.platformContactReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

// Fetches a list of originators associated to a particular platform
export const fetchPlatformOriginators = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(`${PLATFORMS_URL}/${id}/platform_originators`, optionsHeaders())
    //   axios.get(`${PLATFORMS_URL}/platform_originators/${id}`, optionsHeaders())
      .then(function (response) {
          console.log(id)
          console.log(response.data)
          return dispatch(actions.platformOriginatorsReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}

// Fetches a list of loans associated to a particular platform
export const fetchPlatformLoans = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall(any))
      axios.get(`${PLATFORMS_URL}/${id}/platform_loans`, optionsHeaders())
    //   axios.get(`${PLATFORMS_URL}/platform_loans/${id}`, optionsHeaders())
      .then(function (response) {
          console.log(id)
          console.log(response.data)
          return dispatch(actions.platformLoansReceived(response.data));
      })
      .catch(function (error) {
          return dispatch(actions.catchError(error));
      });
}


