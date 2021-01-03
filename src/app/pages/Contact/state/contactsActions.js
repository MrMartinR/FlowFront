import * as requestFromServer from './contactsCRUD';
import { contactsSlice, callTypes } from './contactsSlice';

const { actions } = contactsSlice;

export const contactsSort = (queryParams) => (dispatch) => {
    let { field, isAsc, entities } = queryParams;
    dispatch(
        actions.contactsSort({
            callType: callTypes.action,
            field,
            isAsc,
            entities,
        }),
    );
};
export const fetchContacts = (params) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findContacts(params)
        .then((response) => {
            const { data } = response;
            dispatch(actions.userAccountsFetched({ data }));
        })
        .catch((error) => {
            error.clientMessage = "Can't find Contacts";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

// This works similar to fetchContacts. The difference is that rather than replacing existing data,
// its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
export const fetchNextContacts = (params) => (dispatch) => {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return requestFromServer
        .findNextContacts(params)
        .then((response) => {
            const { pages, page, entities } = response.data;
            dispatch(actions.contactsAppend({ pages, page, entities }));
        })
        .catch((error) => {
            error.clientMessage = "Can't find more Contacts";
            dispatch(actions.catchError({ error, callType: callTypes.list }));
        });
};

export const fetchContact = (id) => (dispatch) => {
    if (!id) {
        return dispatch(actions.contactFetched({ contactForEdit: undefined }));
    }

    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getContactById(id)
        .then((response) => {
            const contact = response.data.data[0];
            dispatch(actions.contactFetched({ contactForEdit: contact }));
        })
        .catch((error) => {
            error.clientMessage = "Can't find Contact";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

