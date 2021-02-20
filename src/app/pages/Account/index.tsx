import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as accountsActions from './state/accountsActions'
import AccountToolBar from './AccountToolbar'
import { AccountsList } from './AccountList'
import { AccountDetails } from './AccountDetails'

export const Accounts = () => {
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.accounts,
    }),
    shallowEqual
  )

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)

  let selectedAccount = {}

  if (list && list[selectedItemIndex]) {
    selectedAccount = list[selectedItemIndex]
  }
  // account Redux state
  const GetAllAccounts = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(accountsActions.fetchAccounts())
      }
    }, [dispatch])
  }
  GetAllAccounts()

  useEffect(() => {
    if (
      currentState &&
      currentState.accountsTable &&
      currentState.accountsTable.success &&
      currentState.accountsTable.entities
    ) {
      setList(currentState.accountsTable.entities)
      setIsLoading(currentState.listLoading)
    }
  }, [currentState])

  return (
    <>
      <AccountToolBar />

      <Grid container spacing={1} direction="row" justify="space-evenly">
        <Grid item key={1} xs={3}>
          <AccountsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
        </Grid>
        <Grid item key={2} xs={9}>
          <AccountDetails selectedAccount={selectedAccount} />
        </Grid>
      </Grid>
    </>
  )
}
