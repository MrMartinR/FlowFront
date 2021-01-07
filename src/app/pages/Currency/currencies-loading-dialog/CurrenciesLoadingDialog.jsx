import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
// import { LoadingDialog } from "../../../../_metronic/_partials/controls";

export function CurrenciesLoadingDialog() {
  // Currencies Redux state
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.currencies.listLoading }),
    shallowEqual
  );
  // looking for loading/dispatch
  useEffect(() => {}, [isLoading]);
  return "";
}
