import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./UserAccountsUIHelpers";

const UserAccountsUIContext = createContext();

export function useUserAccountsUIContext() {
  return useContext(UserAccountsUIContext);
}

export const UserAccountsUIConsumer = UserAccountsUIContext.Consumer;

export const initAccount = {
  id: undefined,
  currency_id: [],
  country_id: [],
  category: "",
  name: "",
  icon: null,
  created_at: "",
  updated_at: "",
  platform_id: "",
};

export const UserAccountsUIProvider = ({ userAccountsUIEvents, children }) => {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initAccount,
    newAccountButtonClick: userAccountsUIEvents.newAccountButtonClick,
    openEditAccountDialog: userAccountsUIEvents.openEditAccountDialog,
    // openDeleteAccountDialog: userAccountsUIEvents.openDeleteAccountDialog,
    // openDeleteUserAccountsDialog: userAccountsUIEvents.openDeleteUserAccountsDialog,
    // openFetchUserAccountsDialog: userAccountsUIEvents.openFetchUserAccountsDialog,
    // openUpdateUserAccountsStatusDialog: userAccountsUIEvents.openUpdateUserAccountsStatusDialog
  };

  return (
    <UserAccountsUIContext.Provider value={value}>
      {children}
    </UserAccountsUIContext.Provider>
  );
};
