import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./AccountsUIHelpers";

const AccountsUIContext = createContext();

export function useAccountsUIContext() {
  return useContext(AccountsUIContext);
}

export const AccountsUIConsumer = AccountsUIContext.Consumer;

export function AccountsUIProvider({ accountsUIEvents, children }) {
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
    currency_id: [],
    country_id: [],
    category: '',
    name: '',
    icon: null,
    created_at: '',
    updated_at: '',
    platform_id: '',
  }

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAccount,
    newAccountButtonClick: accountsUIEvents.newAccountButtonClick,
    openEditAccountDialog: accountsUIEvents.openEditAccountDialog,
    // openDeleteAccountDialog: accountsUIEvents.openDeleteAccountDialog,
    // openDeleteAccountsDialog: accountsUIEvents.openDeleteAccountsDialog,
    // openFetchAccountsDialog: accountsUIEvents.openFetchAccountsDialog,
    // openUpdateAccountsStatusDialog: accountsUIEvents.openUpdateAccountsStatusDialog
  };

  return <AccountsUIContext.Provider value={value}>{children}</AccountsUIContext.Provider>;
}