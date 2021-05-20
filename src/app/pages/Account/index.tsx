import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as accountsActions from './state/accountsActions'
import { AccountToolBar } from './AccountToolbar'
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
  const [actionsLoading, setActionsLoading] = useState(false)
  const [singleAccount, setSingleAccount] = useState({})
  let selectedAccount = null as any

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
  const GetAccount = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (selectedAccount) {
        dispatch(accountsActions.fetchAccount(selectedAccount.id))
      }
    }, [dispatch, selectedAccount ])
  }
  GetAccount();
  useEffect(() => {
    if (
      currentState.accountsTable &&
      currentState.accountsTable.entities
    ) {
      setList(currentState.accountsTable.entities)
    }
  }, [currentState.accountsTable])
  useEffect(() => { if (
    currentState.singleAccount && currentState.singleAccount.entry
  ) {
    setSingleAccount(currentState.singleAccount.entry)
  }
}, [currentState.singleAccount]);

useEffect( () => {
  setIsLoading(currentState.listLoading);
  setActionsLoading(currentState.actionsLoading);
}, [currentState.listLoading, currentState.actionsLoading]);
  return (
    <>
      <AccountToolBar />

      <Grid container spacing={1} direction="row" justify="space-evenly">
        <Grid item key={1} xs={3}>
          <AccountsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
        </Grid>
        <Grid item key={2} xs={8}>
          <AccountDetails selectedAccount={singleAccount} />
        </Grid>
      </Grid>
    </>
  )
}
