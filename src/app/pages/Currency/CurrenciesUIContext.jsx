import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CurrenciesUIHelpers";

const CurrenciesUIContext = createContext();

export function useCurrenciesUIContext() {
  return useContext(CurrenciesUIContext);
}

export const CurrenciesUIConsumer = CurrenciesUIContext.Consumer;

export function CurrenciesUIProvider({ currenciesUIEvents, children }) {
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

  const initCurrency = {
    id: undefined,
    currency_id: '',
    country_id: '',
    category: '',
    name: '',
    icon: '',
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
    initCurrency,
    newCurrencyButtonClick: currenciesUIEvents.newCurrencyButtonClick,
    openEditCurrencyDialog: currenciesUIEvents.openEditCurrencyDialog,
    // openDeleteCurrencyDialog: currenciesUIEvents.openDeleteCurrencyDialog,
    // openDeleteCurrenciesDialog: currenciesUIEvents.openDeleteCurrenciesDialog,
    // openFetchCurrenciesDialog: currenciesUIEvents.openFetchCurrenciesDialog,
    // openUpdateCurrenciesStatusDialog: currenciesUIEvents.openUpdateCurrenciesStatusDialog
  };

  return <CurrenciesUIContext.Provider value={value}>{children}</CurrenciesUIContext.Provider>;
}