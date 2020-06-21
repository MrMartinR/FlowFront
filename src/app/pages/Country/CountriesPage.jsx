import React, { Fragment } from "react";
import { Route } from "react-router-dom";
// import { CountriesLoadingDialog } from "./countries-loading-dialog/CountriesLoadingDialog";
import { CountryEditDialog } from "./countries-edit-dialog/CountryEditDialog";
import { CountriesUIProvider } from "./CountriesUIContext";
import { CountriesCard } from "./CountriesCard";

export function CountriesPage({ history }) {
  const countriesUIEvents = {
    // newCountryButtonClick: () => {
    //   history.push("/countries/new");
    // },
    openEditCountryDialog: (id) => {
      history.push(`/countries/${id}/edit`);
    },
    // openDeleteCountryDialog: (id) => {
    //   history.push(`/countries/${id}/delete`);
    // },
    // openDeleteCountriesDialog: () => {
    //   history.push(`/countries/deleteCountries`);
    // },
    // openFetchCountriesDialog: () => {
    //   history.push(`/countries/fetch`);
    // },
    // openUpdateCountriesStatusDialog: () => {
    //   history.push("/countries/updateStatus");
    // }
  };
  return (
    <CountriesUIProvider countriesUIEvents={countriesUIEvents}>
      {/* <CountriesLoadingDialog /> */}
       <Route path="/countries/new">
        {({ history, match }) => (
          <CountryEditDialog
            show={match != null}
            onHide={() => {
              history.push("/countries");
            }}
          />
        )}
      </Route>
      <Route path="/countries/:id/edit">
        {({ history, match }) => (
          <CountryEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/countries");
            }}
          />
        )}
      </Route>
      
      <CountriesCard />
    </CountriesUIProvider>
  );
}
