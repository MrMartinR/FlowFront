import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AccountsUIHelpers";

const AccountsUIContext = createContext();

export function useAccountsUIContext() {
  return useContext(AccountsUIContext);
}

export const AccountsUIConsumer = AccountsUIContext.Consumer;

export function AccountsUIProvider({ customersUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initAccount = {
    id: undefined,
    provider: '',
    uid: '',
    // encrypted_password: '',
    // reset_password_token: '',
    // reset_password_sent_at: 1,
    // allow_password_change: 1,
    // remember_created_at: 1,
    username: '',
    image: '',
    email: '',
    currency_id: 1,
    country_id: 1,
    // tokens: {},
    // created_at: 1,
    // updated_at: 1,
    role: '',
    dob: 1,
    nam: '',
    surname: '',
  }

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAccount,
    // newAccountButtonClick: customersUIEvents.newAccountButtonClick,
    // openEditAccountDialog: customersUIEvents.openEditAccountDialog,
    // openDeleteAccountDialog: customersUIEvents.openDeleteAccountDialog,
    // openDeleteAccountsDialog: customersUIEvents.openDeleteAccountsDialog,
    // openFetchAccountsDialog: customersUIEvents.openFetchAccountsDialog,
    // openUpdateAccountsStatusDialog: customersUIEvents.openUpdateAccountsStatusDialog
  };

  return <AccountsUIContext.Provider value={value}>{children}</AccountsUIContext.Provider>;
}