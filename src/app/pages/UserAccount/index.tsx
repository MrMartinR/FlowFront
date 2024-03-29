import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'
import { UserAccountsList } from './UserAccountList'
import { UserAccountsDetails } from './UserAccountDetails'
import { RootState } from '../../../redux/rootReducer'
import { makeStyles, Grid } from '@material-ui/core/'
import { UserAlert } from '../../utils/UserAlert'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    // position: 'relative',
    // overflow: 'auto',
  },
})

export const UserAccountsPage = (props: any) => {
  /* styles */
  const classes = useStyles()

  /* Getting curret state of accounts list from store (Redux) */
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)

  const [selectedUserAccountId, setSelectedUserAccountId] = useState(null as any)
  const [list, setList] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [actionsLoading, setActionsLoading] = useState(true)
  const [singleAccount, setSingleAccount] = useState(null as any)
  // peticion da lista de user Accounts
  useEffect(() => {
    dispatch(userAccountsActions.fetchUserAccountsList())
  }, [dispatch])
  // peticion dos details dun user account
  useEffect(() => {
    if (selectedUserAccountId) {
      dispatch(userAccountsActions.fetchuserAccount(selectedUserAccountId))
    }
  }, [dispatch, selectedUserAccountId])
  // peticion dos trasactions dun user account
  useEffect(() => {
    if (selectedUserAccountId) {
      dispatch(userAccountsActions.fetchAccountTransaction(selectedUserAccountId))
    }
  }, [dispatch, selectedUserAccountId])
  // actualiza a lista de userAccounts cos datos do state
  useEffect(() => {
    if (currentState.userAccountsTable) {
      setList(currentState.userAccountsTable)
      setSelectedUserAccountId(currentState.userAccountsTable[0]?.id)
    }
  }, [currentState.userAccountsTable])
  // actualiza a lista de tranactions cos datos do state
  useEffect(() => {
    if (currentState.userAccountsTransactions) {
      setAllTransactions(currentState.userAccountsTransactions)
    }
  }, [currentState.userAccountsTransactions])
  // Actualiza os flags de loading cos datos do state
  useEffect(() => {
    setIsLoading(currentState.listLoading)
    setActionsLoading(currentState.actionsLoading)
  }, [currentState.listLoading, currentState.actionsLoading])
  // actualiza os datos dun user account cosa datos do state
  useEffect(() => {
    if (currentState.userAccountsDetails) {
      setSingleAccount(currentState.userAccountsDetails)
    }
  }, [currentState.userAccountsDetails])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(userAccountsActions.resetSuccess())
  }
  return (
    <Grid container direction="row" item xs={12} className={classes.root}>
      <Grid item xs={3}>
        <UserAccountsList isLoading={isLoading} list={list} setSelectedUserAccountId={setSelectedUserAccountId} />
      </Grid>
      <Grid item xs={9}>
        <UserAccountsDetails
          allTransactions={allTransactions}
          singleAccount={singleAccount}
          actionsLoading={actionsLoading}
        />
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
      </Grid>
    </Grid>
  )
}
