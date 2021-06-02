import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as accountsActions from './state/accountsActions'
import { AccountToolBar } from './AccountToolbar'
import { AccountsList } from './AccountList'
import { AccountDetails } from './AccountDetails'
import { UserAlert } from '../../utils/UserAlert'

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
  const dispatch = useDispatch()
  
  // Petición a API da lista de Accounts
  useEffect(() => {
    if (dispatch) {
      dispatch(accountsActions.fetchAccounts())
    }
  }, [dispatch])
  
  // Unha vez recibida a resposta actualizase o state
  useEffect(() => {
    if (
      currentState.accountsTable &&
      currentState.accountsTable.entities
    ) {
      setList(currentState.accountsTable.entities)
    }
  }, [currentState.accountsTable])

   // Petición dos detalles da Account seleccionada
  useEffect(() => {
    if (selectedAccount) {
      dispatch(accountsActions.fetchAccount(selectedAccount.id))
    }
  }, [dispatch, selectedAccount ])
  
  // Unha vez recibida resposta actualizase o state
  useEffect(() => { if (
    currentState.singleAccount && currentState.singleAccount.entry
    ) {
      setSingleAccount(currentState.singleAccount.entry)
    }
  }, [currentState.singleAccount]);
  
  // actualiza os flags de loading
  useEffect( () => {
    setIsLoading(currentState.listLoading);
    setActionsLoading(currentState.actionsLoading);
  }, [currentState.listLoading, currentState.actionsLoading]);

  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(accountsActions.resetSuccess())
  }
  return (
    <>
      <AccountToolBar />
      <UserAlert resetSuccess = {resetSuccess} success={currentState.success} message = {currentState.message} error = {currentState.error} />
      
      <Grid container spacing={1} direction="row" justify="space-evenly">
        <Grid item key={1} xs={3}>
          <AccountsList isLoading={isLoading} list={list} setSelectedItemIndex={setSelectedItemIndex} />
        </Grid>
        <Grid item key={2} xs={8}>
          <AccountDetails selectedAccount={singleAccount} actionsLoading={actionsLoading}/>
        </Grid>
      </Grid>
    </>
  )
}
