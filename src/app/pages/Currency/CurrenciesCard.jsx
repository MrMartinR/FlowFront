import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
// import { CurrenciesFilter } from "./currencies-filter/CurrenciesFilter";
import { CurrenciesTable } from "./currencies-table/CurrenciesTable";
// import { CurrenciesGrouping } from "./currencies-grouping/CurrenciesGrouping";
import { useCurrenciesUIContext } from "./CurrenciesUIContext";

export function CurrenciesCard() {
  const currenciesUIContext = useCurrenciesUIContext();
  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      newCurrencyButtonClick: currenciesUIContext.newCurrencyButtonClick,
    };
  }, [currenciesUIContext]);

  return (
    <Card>
      <CardHeader title="Currencies list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={currenciesUIProps.newCurrencyButtonClick}
          >
            New Currency
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <CurrenciesFilter /> */}
        {/* {currenciesUIProps.ids.length > 0 && <CurrenciesGrouping />} */}
        <CurrenciesTable />
      </CardBody>
    </Card>
  );
}
