import React from "react";
import { Route } from "react-router-dom";
import { AccountEditDialog } from "../Account/account-edit-dialog/AccountEditDialog";
import { AccountsLoadingDialog } from "../Account/accounts-loading-dialog/AccountsLoadingDialog";
import { AccountsUIProvider } from "../Account/AccountsUIContext";
import UserAccountPage from "./UserAccountPage";

export function UserAccountsPage({ history }) {
  const accountsUIEvents = {
    newAccountButtonClick: () => {
      history.push("/accounts/new");
    },
    openEditAccountDialog: (id) => {
      history.push(`/accounts/${id}/edit`);
    },
    // openDeleteAccountDialog: (id) => {
    //   history.push(`/accounts/${id}/delete`);
    // },
    // openDeleteAccountsDialog: () => {
    //   history.push(`/accounts/deleteAccounts`);
    // },
    // openFetchAccountsDialog: () => {
    //   history.push(`/accounts/fetch`);
    // },
    // openUpdateAccountsStatusDialog: () => {
    //   history.push("/accounts/updateStatus");
    // }
  };

  return (
    <AccountsUIProvider accountsUIEvents={accountsUIEvents}>
      <AccountsLoadingDialog />
      <Route path="/">
        {({ history, match }) => (
          <UserAccountPage
            show={match != null}
            onHide={() => {
              history.push("/user_accounts");
            }}
          />
        )}
      </Route>
      <Route path="/user_accounts/new">
        {({ history, match }) => (
          <AccountEditDialog
            show={match != null}
            onHide={() => {
              history.push("/user_accounts");
            }}
          />
        )}
      </Route>
      <Route path="/user_accounts/:id/edit">
        {({ history, match }) => (
          <AccountEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/user_accounts");
            }}
          />
        )}
      </Route>
    </AccountsUIProvider>
  );
}
