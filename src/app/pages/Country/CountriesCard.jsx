import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
} from "@material-ui/core";
// import { CountriesFilter } from "./countries-filter/CountriesFilter";
// import { CountriesTable } from "./countries-table/CountriesTable";
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={countriesUIProps.newCountryButtonClick}
          >
            New Country
          </button>
      </CardHeader>
      <CardBody></CardBody>
    </Card>
  );
}
