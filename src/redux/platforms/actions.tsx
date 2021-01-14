import axios from 'axios';
import { API_URL, optionsHeaders } from '../utils'

export const REQUEST_PLATFORMSLIST = 'REQUEST_PLATFORMSLIST';
export const RECEIVE_PLATFORMSLIST = 'RECEIVE_PLATFORMSLIST';
export const ERROR_REQUESTING_PLATFORMSLIST = 'ERROR_REQUESTING_PLATFORMSLIST';
  
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

