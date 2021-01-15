import axios from 'axios';
import { API_URL, optionsHeaders } from '../utils'

export const REQUEST_PLATFORMS_LIST = 'REQUEST_PLATFORMS_LIST';
export const RECEIVE_PLATFORMS_LIST = 'RECEIVE_PLATFORMS_LIST';
export const ERROR_REQUESTING_PLATFORMS_LIST = 'ERROR_REQUESTING_PLATFORMS_LIST';
  
function requestPlatformsList() {
    return {
        type: REQUEST_PLATFORMS_LIST
    }
}

function receivePlatformsList(response: any) {
    return {
        type: RECEIVE_PLATFORMS_LIST,
        PLATFORMS_LIST: response.data,
    }
}

function errorRequestingPlatformsList(error: any) {
    return {
        type: ERROR_REQUESTING_PLATFORMS_LIST,
        error: error,
    }
}

export function fetchPlatformsList() {
    return function(dispatch: (arg0: { type: string; platformsTable?: any; error?: any; }) => void) {
        dispatch(requestPlatformsList())
        axios.get(`${API_URL}/api/v1/platforms`, optionsHeaders())
        .then(function (response) {
            return dispatch(receivePlatformsList(response.data));
        })
        .catch(function (error) {
            return dispatch(errorRequestingPlatformsList(error));
        });
    }
}

