import React from "react";
import { Route } from "react-router-dom";
//import { AccountsLoadingDialog } from "./accounts-loading-dialog/AccountsLoadingDialog";
// import { AccountEditDialog } from "./account-edit-dialog/AccountEditDialog";
// import { AccountsUIProvider } from "./AccountsUIContext";
// import { AccountsCard } from "./AccountsCard";

export function CurrencyPage({ history }) {

  const accountsUIEvents = {
    // newAccountButtonClick: () => {
    //   history.push("/accounts/new");
    // },

    // openEditAccountDialog: (id) => {
    //   history.push(`/currency/${id}/edit`);
    // },
    
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
  }

  return(
    <h1>sirve</h1>
  )

  // return (
  //   <AccountsUIProvider accountsUIEvents={accountsUIEvents}>
  //   {/* <AccountsUIProvider > */}
  //     <AccountsLoadingDialog />
  //     <Route path="/accounts/:id/edit">
  //       {({ history, match }) => (
  //         <AccountEditDialog
  //           show={match != null}
  //           id={match && match.params.id}
  //           onHide={() => {
  //             history.push("/accounts");
  //           }}
  //         />
  //       )}
  //     </Route>
  //     <AccountsCard />
  //   </AccountsUIProvider>
  // );
}
