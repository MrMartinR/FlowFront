import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
// import { CountriesFilter } from "./countries-filter/CountriesFilter";
import { CountriesTable } from "./countries-table/CountriesTable";
// import { CountriesGrouping } from "./countries-grouping/CountriesGrouping";
import { useCountriesUIContext } from "./CountriesUIContext";

export function CountriesCard() {
  const countriesUIContext = useCountriesUIContext();
  const countriesUIProps = useMemo(() => {
    return {
      ids: countriesUIContext.ids,
      newCountryButtonClick: countriesUIContext.newCountryButtonClick,
    };
  }, [countriesUIContext]);

  return (
    <Card>
      <CardHeader title="Countries list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={countriesUIProps.newCountryButtonClick}
          >
            New Country
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {/* <CountriesFilter /> */}
        {/* {countriesUIProps.ids.length > 0 && <CountriesGrouping />} */}
        {/* <CountriesTable /> */}
      </CardBody>
    </Card>
  );
}
