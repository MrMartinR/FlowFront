import * as requestFromServer from './platformsCrud';
import { platformsSlice, callTypes } from './platformsSlice';

const { actions } = platformsSlice;

export const fetchPlatforms = (params) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .getAllAccounts()
        .then((response) => {
            // console.log(response.data.data);
            const { data } = response.data;
            dispatch(actions.platformsFetched({ data }));
        })
        .catch((error) => {
            error.clientMessage = "Can't find accounts";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const filterPlatforms = (params) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.action }));
    // console.log("Params: ", params);
    dispatch(actions.filterData(params));
    // return requestFromServer
    //   .getAllAccounts()
    //   .then(response => {
    //     // console.log(response.data.data);
    //     const { data } = response.data;
    //     dispatch(actions.platformsFetched({ data }));
    //   })
    //   .catch(error => {
    //     error.clientMessage = "Can't find accounts";
    //     dispatch(actions.catchError({ error, callType: callTypes.list }));
    //   });
};
