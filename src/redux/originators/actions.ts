import axios from 'axios';
import { API_URL, optionsHeaders } from '../utils'

export const REQUEST_ORIGINATORS = 'REQUEST_ORIGINATORS';
export const RECEIVE_ORIGINATORS = 'RECEIVE_ORIGINATORS';
export const ERROR_REQUESTING_ORIGINATORS = 'ERROR_REQUESTING_ORIGINATORS';
  
function requestOriginators() {
    return {
        type: REQUEST_ORIGINATORS
    }
}

function receiveOriginators(response: any) {
    return {
        type: RECEIVE_ORIGINATORS,
        originators: response.data,
    }
}

function errorRequestingOriginators(error: any) {
    return {
        type: ERROR_REQUESTING_ORIGINATORS,
        error: error,
    }
}

export function fetchOriginators() {
    return function(dispatch: (arg0: { type: string; originators?: any; error?: any; }) => void) {
        dispatch(requestOriginators())
        axios.get(`${API_URL}/api/v1/originators`, optionsHeaders())
        .then(function (response) {
            // console.log(response.data)
            return dispatch(receiveOriginators(response.data));
        })
        .catch(function (error) {
            return dispatch(errorRequestingOriginators(error));
        });
    }
}

