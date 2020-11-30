import * as requestFromServer from "./accountsCrud";
import { accountsSlice, callTypes } from "./accountsSlice";

const { actions } = accountsSlice;

export const accountSort = queryParams => dispatch => {
  let { field, isAsc, entities } = queryParams
  // console.log('fieldXXX', field)
  dispatch(actions.accountSort({ callType: callTypes.action, field, isAsc, entities }));
}
export const fetchAccounts = params => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAccounts(params)
    .then(response => {
      const { pages, page, entities } = response.data;
      dispatch(actions.accountsFetched({ pages, page, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find accounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

// This works similar to fetchAccounts. The difference is that rather than replacing existing data,
// its append new data to existing data. Usefull for implementing infinite list where new data is loaded on demand.
export const fetchNextAccounts = params => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findNextAccounts(params)
    .then(response => {
      const { pages, page, entities } = response.data;
      dispatch(actions.accountsAppend({ pages, page, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find more accounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAccount = id => dispatch => {
  if (!id) {
    return dispatch(actions.accountFetched({ accountForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  console.log("Looking");
  return requestFromServer
  .getAccountById(id)
  .then(response => {
      console.log("Fetched");
      console.log(response.data);
      const account = response.data.data[0];
      dispatch(actions.accountFetched({ accountForEdit: account }));
    })
    .catch(error => {
      error.clientMessage = "Can't find account";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAccount = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccount(id)
    .then(response => {
      dispatch(actions.accountDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete account";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createAccount = accountForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createAccount(accountForCreation)
    .then(response => {
      const { account } = response.data;
      dispatch(actions.accountCreated({ account }));
    })
    .catch(error => {
      error.clientMessage = "Can't create account";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAccount = account => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateAccount(account)
    .then(() => {
      dispatch(actions.accountUpdated({ account }));
    })
    .catch(error => {
      error.clientMessage = "Can't update account";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAccountsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForAccounts(ids, status)
    .then(() => {
      dispatch(actions.accountsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update accounts status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteAccounts = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteAccounts(ids)
    .then(() => {
      dispatch(actions.accountsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete accounts";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
