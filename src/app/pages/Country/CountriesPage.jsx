import React from "react";
import { Route } from "react-router-dom";
import { CountryEditDialog } from "./country-edit-dialog/CountryEditDialog";
import { CountriesUIProvider } from "./CountriesUIContext";
import CountryPage from "../CountryPage";

export function CountriesPage({ history }) {
  const countriesUIEvents = {
    newCountryButtonClick: () => {
      history.push("/countries/new");
    },
    openEditCountryDialog: (id) => {
      history.push(`/countries/${id}/edit`);
    },
  };
  return (
    <CountriesUIProvider countriesUIEvents={countriesUIEvents}>
      {/* <CountriesLoadingDialog /> */}

      <Route path="/">
        {({ history, match }) => (
          <CountryPage
            show={match != null}
            onHide={() => {
              history.push("/countries");
            }}
          />
        )}
      </Route>
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

      {/* <CountriesCard /> */}
    </CountriesUIProvider>
  );
}
