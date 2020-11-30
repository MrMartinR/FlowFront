import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { AccountsLoadingDialog } from "./accounts-loading-dialog/AccountsLoadingDialog";
import { AccountCreateDialog } from "./account-create-dialog/AccountCreateDialog";
// import { AccountEditDialog } from "./account-edit-dialog/AccountEditDialog";
import { AccountsUIProvider } from "./AccountsUIContext";
// import { AccountsCard } from "./AccountsCard";
import { AccountsList } from "./AccountsList";
import { AccountsDetails } from "./AccountsDetails";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as accountsActions from "../../../redux/accounts/accountsActions";
import * as currenciesActions from "../../../redux/currencies/currenciesActions";
import * as countriesActions from "../../../redux/countries/countriesActions";


const AccountsPageStyles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflowY: "scroll"
  }
}

export function AccountsPage({ history }) {

  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.accounts }),
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
    
  const [ selectedItemIndex, setSelectedItemIndex ] = useState(0)
  const [ list, setList ] = useState([])
  const [ currentPage, setCurrentPage ] = useState(0)
  const [ totalPages, setTotalPages ] = useState(1)
  const [ isLoading, setIsLoading ] = useState(true)
  const [ perPage ] = useState(10)

  // Accounts Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    if (dispatch && perPage) {
      const pageNumber = 1;
      dispatch(accountsActions.fetchAccounts({ page: pageNumber, perPage: perPage }));
      dispatch(countriesActions.fetchAllCountry())
      dispatch(currenciesActions.fetchAllCurrencies())
    }
  }, [dispatch, perPage]);

  useEffect(() => {
    // console.log(currentState);
    // console.log(currenciesState);
    // console.log(countriesState);
    if (currentState && currentState.accountTable && currentState.accountTable.entities && currentState.accountTable.entities.length > 0) {
      setList(currentState.accountTable.entities)
      setCurrentPage(currentState.accountTable.page)
      setTotalPages(currentState.accountTable.pages)
      setIsLoading(currentState.listLoading)
    }
  }, [currentState, currenciesState, countriesState])

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
  }

  return (
    <AccountsUIProvider accountsUIEvents={accountsUIEvents}>
      <AccountsLoadingDialog />
      <Route path="/accounts/new">
        {({ history, match }) => (
          <AccountCreateDialog
            countriesTable={countriesState && countriesState.countryTable ? countriesState.countryTable.entities : null} 
            currencyTable={currenciesState && currenciesState.currencyTable ? currenciesState.currencyTable.entities : null}
            show={match != null}
            onHide={() => {
              history.push("/accounts");
            }}
          />
        )}
      </Route>
      {/* <Route path="/accounts/:id/edit">
        {({ history, match }) => (
          <AccountEditDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/accounts");
            }}
          />
        )}
      </Route> */}
      <div style={AccountsPageStyles.main}>
        <AccountsList perPage={perPage} isLoading={isLoading} list={list} currentPage={currentPage} totalPages={totalPages} setSelectedItemIndex={setSelectedItemIndex} newAccountFunc={accountsUIEvents.newAccountButtonClick} style={{position: 'static'}} />
        <AccountsDetails countriesTable={countriesState && countriesState.countryTable ? countriesState.countryTable.entities : null} currencyTable={currenciesState && currenciesState.currencyTable ? currenciesState.currencyTable.entities : null} list={list} selectedItemIndex={selectedItemIndex}/>
      </div>

    </AccountsUIProvider>
  );
}
