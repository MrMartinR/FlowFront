import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { UserAccountCreateDialog } from './UserAccountCreateDialog'
import { UserAccountsUIProvider } from './UserAccountsUIContext'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as userAccountsActions from '../../../redux/userAccounts/userAccountsActions'
import * as currenciesActions from '../../../redux/currencies/currenciesActions'
import * as countriesActions from '../../../redux/countries/countriesActions'
import { UserAccountsList } from './UserAccountList'
import { UserAccountsDetails } from './UserAccountDetails'

const AccountsPageStyles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflowY: 'scroll'
  }
}

export const UserAccountsPage = ({ history }) => {
  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector((state) => ({ currentState: state.userAccounts }), shallowEqual)
  const { currenciesState } = useSelector((state) => ({ currenciesState: state.currencies }), shallowEqual)
  const { countriesState } = useSelector((state) => ({ countriesState: state.countries }), shallowEqual)

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
  const dispatch = useDispatch()
  useEffect(() => {
    if (dispatch && perPage) {
      const pageNumber = 1
      dispatch(
        userAccountsActions.fetchUserAccounts({
          page: pageNumber,
          perPage: perPage
        })
      )
      dispatch(countriesActions.fetchAllCountry())
      dispatch(currenciesActions.fetchAllCurrencies())
      dispatch(userAccountsActions.fetchAccountTransaction())
    }
  }, [dispatch, perPage])

  useEffect(() => {
    if (
      currentState &&
      currentState.userAccountTable &&
      currentState.userAccountTable.success &&
      currentState.userAccountTable.data &&
      currentState.userAccountTable.data.length > 0
    ) {
      setList(currentState.userAccountTable.data)
      setCurrentPage(currentState.userAccountTable.page)
      setTotalPages(currentState.userAccountTable.pages)
      setIsLoading(currentState.listLoading)
    }
    if (
      currentState &&
      currentState.userAccountTransactions &&
      currentState.userAccountTransactions &&
      currentState.userAccountTransactions.length > 0
    ) {
      setAllTransactions(currentState.userAccountTransactions)
    }
  }, [currentState, currenciesState, countriesState])

  const userAccountsUIEvents = {
    newAccountButtonClick: () => {
      history.push('/user_accounts/new')
    },
    openEditAccountDialog: (id) => {
      history.push(`/user_accounts/${id}/edit`)
    }
  }

  return (
    <UserAccountsUIProvider userAccountsUIEvents={userAccountsUIEvents}>
      <Route path="/user_accounts/new">
        {({ history, match }) => (
          <UserAccountCreateDialog
            countriesTable={countriesState && countriesState.countryTable ? countriesState.countryTable.entities : null}
            currencyTable={
              currenciesState && currenciesState.currencyTable ? currenciesState.currencyTable.entities : null
            }
            show={match != null}
            onHide={() => {
              history.push('/user_accounts')
            }}
          />
        )}
      </Route>

      <div style={AccountsPageStyles.main}>
        <UserAccountsList
          perPage={perPage}
          isLoading={isLoading}
          list={list}
          currentPage={currentPage}
          totalPages={totalPages}
          setSelectedItemIndex={setSelectedItemIndex}
          newAccountFunc={userAccountsUIEvents.newAccountButtonClick}
          style={{ position: 'static' }}
          allTransactions={allTransactions}
        />
        <UserAccountsDetails
          allTransactions={allTransactions}
          selectedUserAccount={selectedUserAccount}
          selectedItemIndex={selectedItemIndex}
        />
      </div>
    </UserAccountsUIProvider>
  )
}
