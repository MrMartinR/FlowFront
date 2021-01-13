import axios from 'axios';
import store from '../store'
import { API_URL } from '../utils'

export const REQUEST_PLATFORMSLIST = 'REQUEST_PLATFORMSLIST';
export const RECEIVE_PLATFORMSLIST = 'RECEIVE_PLATFORMSLIST';
export const ERROR_REQUESTING_PLATFORMSLIST = 'ERROR_REQUESTING_PLATFORMSLIST';

const optionsHeaders = () => {
    const {
      auth: {
        user, client, expiry, token,
      },
    } = store.getState()
  
    const options = {
      headers: {
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Type': 'application/json; charset=utf-8',
        'access-token': token,
        'token-type': 'Bearer',
        client,
        expiry,
        uid: user.email,
      },
    }
    return options
}
  

function requestPlatformslist() {
    return {
        type: REQUEST_PLATFORMSLIST
    }
}

function receivePlaformslist(response: any) {
    return {
        type: RECEIVE_PLATFORMSLIST,
        platformslist: response.data,
    }
}

function errorRequestingPlatformslist(error: any) {
    return {
        type: ERROR_REQUESTING_PLATFORMSLIST,
        error: error,
    }
}

export function fetchPlatformslist() {
    return function(dispatch: (arg0: { type: string; platformsTable?: any; error?: any; }) => void) {
        dispatch(requestPlatformslist())
        axios.get(`${API_URL}/api/v1/platforms`, optionsHeaders())
        .then(function (response) {
            return dispatch(receivePlaformslist(response.data));
        })
        .catch(function (error) {
            return dispatch(errorRequestingPlatformslist(error));
        });
    }
}

