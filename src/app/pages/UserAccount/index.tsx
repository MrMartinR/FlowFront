import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { UserAccountCreateDialog } from './UserAccountCreateDialog'
// import { UserAccountsUIProvider } from './UserAccountsUIContext'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'
import * as currenciesActions from '../Currency/state/currenciesActions'
import * as countriesActions from '../Country/state/countriesActions'
import { UserAccountsList } from './UserAccountList'
import { UserAccountsDetails } from './UserAccountDetails'
import { RootState } from '../../../redux/rootReducer'
import { Grid } from '@material-ui/core/'

const AccountsPageStyles = {
  main: {
    display: 'flex',
    height: '94vh',
  },
}

export const UserAccountsPage = (props: any) => {
  const { history } = props
  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)
  const { currenciesState } = useSelector((state: RootState) => ({ currenciesState: state.currencies }), shallowEqual)
  const { countriesState } = useSelector((state: RootState) => ({ countriesState: state.countries }), shallowEqual)

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [perPage] = useState(10)
  let selectedUserAccount = {}

  if (list && list[selectedItemIndex]) {
    selectedUserAccount = list[selectedItemIndex]
  }
  // Accounts Redux state
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (dispatch && perPage) {
  //     const pageNumber = 1
  //     dispatch(
  //       userAccountsActions.fetchUserAccounts({
  //         page: pageNumber,
  //         perPage: perPage,
  //       })
  //     )
  //     dispatch(countriesActions.getAllCountry())
  //     dispatch(currenciesActions.getAllCurrencies())
  //   }
  // }, [dispatch, perPage])

  // useEffect(() => {
  //   if (
  //     currentState &&
  //     currentState.userAccountTable &&
  //     currentState.userAccountTable.success &&
  //     currentState.userAccountTable.data &&
  //     currentState.userAccountTable.data.length > 0
  //   ) {
  //     setList(currentState.userAccountTable.data)
  //     setCurrentPage(currentState.userAccountTable.page)
  //     setTotalPages(currentState.userAccountTable.pages)
  //     setIsLoading(currentState.listLoading)
  //   }
  //   if (
  //     currentState &&
  //     currentState.userAccountTransactions &&
  //     currentState.userAccountTransactions &&
  //     currentState.userAccountTransactions.length > 0
  //   ) {
  //     setAllTransactions(currentState.userAccountTransactions)
  //   }
  // }, [currentState, currenciesState, countriesState])

  // useEffect(() => {
  //   if (list && list[selectedItemIndex]) {
  //     selectedUserAccount = list[selectedItemIndex]
  //     let id = (selectedUserAccount as any)?.id
  //     dispatch(userAccountsActions.fetchAccountTransaction(id))
  //   }
  // }, [list])

  const userAccountsUIEvents = {
    newAccountButtonClick: () => {
      history.push('/user_accounts/new')
    },
    openEditAccountDialog: (id: number) => {
      history.push(`/user_accounts/${id}/edit`)
    },
  }

  return (
    // <UserAccountsUIProvider userAccountsUIEvents={userAccountsUIEvents}>
    // {/* <Route path="/user_accounts/new">
    //   {({ history, match }) => (
    //     <UserAccountCreateDialog
    //       countriesTable={countriesState && countriesState.countryTable ? countriesState.countryTable.entities : null}
    //       currencyTable={
    //         currenciesState && currenciesState.currencyTable ? currenciesState.currencyTable.entities : null
    //       }
    //       show={match != null}
    //       onHide={() => {
    //         history.push('/user_accounts')
    //       }}
    //     />
    //   )}
    // </Route> */}
    <Grid container xs={12}>
      {/* <div style={AccountsPageStyles.main}> */}
      <Grid item xs={3}>
        <UserAccountsList
          // perPage={perPage}
          isLoading={isLoading}
          list={list}
          // currentPage={currentPage}
          // totalPages={totalPages}
          setSelectedItemIndex={setSelectedItemIndex}
          newAccountFunc={userAccountsUIEvents.newAccountButtonClick}
          style={{ position: 'static' }}
          allTransactions={allTransactions}
        />
      </Grid>
      <Grid item xs={9}>
        <UserAccountsDetails
          allTransactions={allTransactions}
          selectedUserAccount={selectedUserAccount}
          selectedItemIndex={selectedItemIndex}
        />
      </Grid>
      // {/* </div> */}
    </Grid>
    // {/* </UserAccountsUIProvider> */}
  )
}
