import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'
import { UserAccountsList } from './UserAccountList'
import { UserAccountsDetails } from './UserAccountDetails'
import { RootState } from '../../../redux/rootReducer'
import { Grid } from '@material-ui/core/'

export const UserAccountsPage = (props: any) => {
  // Getting curret state of accounts list from store (Redux)
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)

  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [list, setList] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionsLoading, setActionsLoading] = useState(true)
  const [singleAccount, setSingleAccount] = useState({})
  let selectedUserAccount = null as any

  if (list.length>0 && list[selectedItemIndex]) {
    selectedUserAccount = list[selectedItemIndex]
  }
  const GetAllAccounts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(
          userAccountsActions.fetchUserAccountsList()
        )
      }
    }, [dispatch])
  }
  GetAllAccounts();
  const GetAccount = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (selectedUserAccount) {
        dispatch(userAccountsActions.fetchuserAccount(selectedUserAccount?.id))
      }
    }, [dispatch, selectedUserAccount ])
  }
  GetAccount();
  const GetAllTransactions = () => {
    const dispatch = useDispatch()
    useEffect(() => {
      if (selectedUserAccount) {
        dispatch(
          userAccountsActions.fetchAccountTransaction(selectedUserAccount?.id)
        )
      }
    }, [dispatch, selectedUserAccount ])
  }
  GetAllTransactions();
  useEffect(() => {
    if (
      currentState.userAccountsTable
    ) {
      setList(currentState.userAccountsTable)
    }
  }, [currentState.userAccountsTable]);
  useEffect(() => {
    if (
      currentState.userAccountsTransactions
    ) {
      setAllTransactions(currentState.userAccountsTransactions)
    }
  }, [currentState.userAccountsTransactions]);
  useEffect(() => {
    setIsLoading(currentState.listLoading);
    setActionsLoading(currentState.actionsLoading);
  }, [currentState.listLoading, currentState.actionsLoading]);
  useEffect(() => { if (
    currentState.userAccountsDetails
  ) {
    setSingleAccount(currentState.userAccountsDetails)
  }
}, [currentState.userAccountsDetails]);

  return (
    <Grid container direction='row' item xs={12}>
      <Grid item xs={3}>
        <UserAccountsList
          isLoading={isLoading}
          list={list}
          setSelectedItemIndex={setSelectedItemIndex}
        />
      </Grid>
      <Grid item xs={9}>
        <UserAccountsDetails
          allTransactions={allTransactions}
          singleAccount={singleAccount}
          actionsLoading={actionsLoading}
        />
      </Grid>
    </Grid>
  )
}
