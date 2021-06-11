import { makeStyles, Toolbar, Grid, CardHeader, Button, Avatar } from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as data from './import/iuvo-2020-01-30-2200 (2).json'
import * as userAccountsActions from './state/userAccountsActions'
import * as loansActions from './../Loan/state/loansActions'
/* styles */
const useStyles = makeStyles({
  root: {
    // background: '#f1f1f1',
    maxWidth: '100%',
    position: 'relative',
    overflow: 'auto',
  },
})

export const UserAccountDetailsToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { loanState } = useSelector((state: RootState) => ({ loanState: state.loans }), shallowEqual)
  const { value, balance, singleAccount } = props
  const [loans, setLoans] = useState(null as any)
  const [loanId, setLoanId] = useState(null as any)
  const dispatch = useDispatch()
  const handleTransaction = () => {

  }
  const handleTransfer = () => {

  }
  const handleClick = () => {

  }
  const handleImport = () => {
    /* loans.map((loan: any) => {
      if (loan.attributes.code === data[1].ID) {
        setLoanId(loan.id)
      }
      return loan.id
    }) */
  }
  /* useEffect(() => {
    const form = {
      description: data[1].Concept,
      ref: data[1].Ref,
      amount: data[1].Amount,
      date: data[1].Date,
      time: data[1].Time,
      category: data[1].Category,
      user_account_id: singleAccount.id,
      loan_id: loanId,
    }
    if (loanId !== null) dispatch(userAccountsActions.createTransaction(form))
  }, [loanId, dispatch, singleAccount]) */
  /* useEffect(() => {
    dispatch(loansActions.fetchLoansData())
  }, [dispatch]) */
  /* useEffect(() => {
    setLoans(loanState.loansData)
  }, [loanState.loansData]) */
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid item xs={12}>
        <CardHeader
          avatar={
            <Avatar
              src={'/media/svg/contact/icons/' + singleAccount.attributes?.account?.contact_id + '.svg'}
              alt={singleAccount.attributes?.name}
              variant="square"
            />
          }
          title={singleAccount.attributes?.name}
          subheader={'Value ' + value + ' Balance ' + balance.toFixed(2)}
          action={
            <>
              <Button onClick={handleTransfer}>Add Transfer</Button>
              <Button onClick={handleTransaction}>Add Transaction</Button>
              <Button onClick={handleImport}>Import</Button>
              <Button onClick={handleClick}>•••</Button>
            </>
          }
        ></CardHeader>
      </Grid>
    </Toolbar>
  )
}
