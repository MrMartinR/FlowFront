import React from "react";
import { Route } from "react-router-dom";
import { CurrenciesLoadingDialog } from "./currencies-loading-dialog/CurrenciesLoadingDialog";
import { CurrencyEditDialog } from "./currency-edit-dialog/CurrencyEditDialog";
import { CurrenciesUIProvider } from "./CurrenciesUIContext";
import { CurrenciesCard } from "./CurrenciesCard";
import { useSelector } from "react-redux";

export function CurrenciesPage(props) {
  const { history } = props;

  const auth = useSelector((state) => state.auth);

  const currenciesUIEvents = {
    newCurrencyButtonClick: () => {
      history.push("/currencies/new");
    },
    openEditCurrencyDialog: (id) => {
      history.push(`/currencies/${id}/edit`);
    },
    // openDeleteCurrencyDialog: (id) => {
    //   history.push(`/currencies/${id}/delete`);
    // },
    // openDeleteCurrenciesDialog: () => {
    //   history.push(`/currencies/deleteCurrencies`);
    // },
    // openFetchCurrenciesDialog: () => {
    //   history.push(`/currencies/fetch`);
    // },
    // openUpdateCurrenciesStatusDialog: () => {
    //   history.push("/currencies/updateStatus");
    // }
  };

  return (
    <CurrenciesUIProvider currenciesUIEvents={currenciesUIEvents}>
      <CurrenciesLoadingDialog />

      <Route path="/">
        {({ history, match }) => (
          <CurrenciesCard
            show={match != null}
            onHide={() => {
              history.push("/currencies");
            }}
            auth={auth}
          />
        )}
      </Route>
      <Route path="/currencies/new">
        {({ history, match }) => (
          <CurrencyEditDialog
            show={match != null}
            onHide={() => {
              history.push("/currencies");
            }}
          />
        )}
      </Route>
      <Route path="/currencies/:id/edit">
        {({ history, match }) => (
          <CurrencyEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/currencies");
            }}
          />
        )}
      </Route>
    </CurrenciesUIProvider>
  );
}
