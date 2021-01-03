import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../Account/AccountsUIHelpers";

const ContactsUIContext = createContext();

export function useContactsUIContext() {
  return useContext(ContactsUIContext);
}

export const ContactsUIConsumer = ContactsUIContext.Consumer;

export const initContact = {
  id: undefined,
  trade_name: "",
  name: "",
};

export const ContactsUIProvider = ({ children }) => {
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
    initContact,
  };

  return (
    <ContactsUIContext.Provider value={value}>
      {children}
    </ContactsUIContext.Provider>
  );
};
