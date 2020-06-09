import React from "react";
import { Route } from "react-router-dom";
import { AccountsLoadingDialog } from "./accounts-loading-dialog/AccountsLoadingDialog";
import { AccountsUIProvider } from "./AccountsUIContext";
import { AccountsCard } from "./AccountsCard";

export function AccountsPage({ history }) {

  const customersUIEvents = {
    newAccountButtonClick: () => {
      history.push("/accounts/new");
    },
    openEditAccountDialog: (id) => {
      history.push(`/accounts/${id}/edit`);
      
    },
    openDeleteAccountDialog: (id) => {
      history.push(`/accounts/${id}/delete`);
    },
    openDeleteAccountsDialog: () => {
      history.push(`/accounts/deleteAccounts`);
    },
    openFetchAccountsDialog: () => {
      history.push(`/accounts/fetch`);
    },
    openUpdateAccountsStatusDialog: () => {
      history.push("/accounts/updateStatus");
    }
  }

  return (
    // <AccountsUIProvider customersUIEvents={customersUIEvents}>
    <AccountsUIProvider >
      <AccountsLoadingDialog />
      <AccountsCard />
    </AccountsUIProvider>
  );
}
