import * as requestFromServer from "./accountsCrud";
import { accountsSlice, callTypes } from "./accountsSlice";

const { actions } = accountsSlice;

export const accountSort = queryParams => dispatch => {
  let { field, isAsc, entities } = queryParams
  console.log('fieldXXX', field)
  dispatch(actions.accountSort({ callType: callTypes.action, field, isAsc, entities }));
}
export const fetchAccounts = params => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findAccounts(params)
    .then(response => {
      const { pages, page, entities } = response.data;
      entities.map(i => i ?  
      console.log(Object.keys(i.currencies).lenght > 0 ? i.currencies.replace(/\\/g, "") : 0) : console.log(i.currencies)
      )
      // for (const i of entities) {
      //   console.log(i.currencies  )
        
      // }
      console.log('sssss', entities)
      dispatch(actions.accountsFetched({ pages, page, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find accounts";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAccount = id => dispatch => {
  if (!id) {
    return dispatch(actions.accountFetched({ accountForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAccountById(id)
    .then(response => {
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
