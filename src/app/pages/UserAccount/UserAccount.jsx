import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AccountsLoadingDialog } from "../Account/accounts-loading-dialog/AccountsLoadingDialog";
import { UserAccountCreateDialog } from "./UserAccountCreateDialog";
import { UserAccountsUIProvider } from "./UserAccountsUIContext";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as userAccountsActions from "../../../redux/userAccounts/userAccountsActions";
import * as currenciesActions from "../../../redux/currencies/currenciesActions";
import * as countriesActions from "../../../redux/countries/countriesActions";
import { UserAccountsList } from "./UserAccountList";
import { UserAccountsDetails } from "./UserAccountDetails";

const AccountsPageStyles = {
  main: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    overflowY: "scroll",
  },
};

export const UserAccountsPage = ({ history }) => {
  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.userAccounts }),
    shallowEqual
  );
  const { currenciesState } = useSelector(
    (state) => ({ currenciesState: state.currencies }),
    shallowEqual
  );
  const { countriesState } = useSelector(
    (state) => ({ countriesState: state.countries }),
    shallowEqual
  );

  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [perPage] = useState(10);

  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && perPage) {
      const pageNumber = 1;
      dispatch(
        userAccountsActions.fetchUserAccounts({
          page: pageNumber,
          perPage: perPage,
        })
      );
      dispatch(countriesActions.fetchAllCountry());
      dispatch(currenciesActions.fetchAllCurrencies());
    }
  }, [dispatch, perPage]);

  useEffect(() => {
    if (
      currentState &&
      currentState.userAccountTable &&
      currentState.userAccountTable.success &&
      currentState.userAccountTable.data &&
      currentState.userAccountTable.data.length > 0
    ) {
      setList(currentState.userAccountTable.data);
      setCurrentPage(currentState.userAccountTable.page);
      setTotalPages(currentState.userAccountTable.pages);
      setIsLoading(currentState.listLoading);
    }
  }, [currentState, currenciesState, countriesState]);

  const userAccountsUIEvents = {
    newAccountButtonClick: () => {
      history.push("/user_accounts/new");
    },
    openEditAccountDialog: (id) => {
      history.push(`/user_accounts/${id}/edit`);
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
    <UserAccountsUIProvider userAccountsUIEvents={userAccountsUIEvents}>
      <AccountsLoadingDialog />
      <Route path="/user_accounts/new">
        {({ history, match }) => (
          <UserAccountCreateDialog
            countriesTable={
              countriesState && countriesState.countryTable
                ? countriesState.countryTable.entities
                : null
            }
            currencyTable={
              currenciesState && currenciesState.currencyTable
                ? currenciesState.currencyTable.entities
                : null
            }
            show={match != null}
            onHide={() => {
              history.push("/user_accounts");
            }}
          />
        )}
      </Route>
      {/* <Route path="/user_accounts/:id/edit">
        {({ history, match }) => (
          <AccountEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/user_accounts");
            }}
          />
        )}
      </Route> */}
      <div style={AccountsPageStyles.main}>
        <UserAccountsList
          perPage={perPage}
          isLoading={isLoading}
          list={list}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedItemIndex={setSelectedItemIndex}
          newAccountFunc={userAccountsUIEvents.newAccountButtonClick}
          style={{ position: "static" }}
        />
        <UserAccountsDetails
          countriesTable={
            countriesState && countriesState.countryTable
              ? countriesState.countryTable.entities
              : null
          }
          currencyTable={
            currenciesState && currenciesState.currencyTable
              ? currenciesState.currencyTable.entities
              : null
          }
          list={list}
          selectedItemIndex={selectedItemIndex}
        />
      </div>
    </UserAccountsUIProvider>
  );
};
