import { Grid, Paper, CardContent, Typography, Toolbar, Button, Card, LinearProgress } from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as userLoansActions from './../UserLoan/state/userLoansActions'

export const UserLoanDetails = (props: any) => {
  const { id } = props
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userLoans,
    }),
    shallowEqual
  )
  console.log(id)
  const [isLoading, setIsLoading] = useState(false)
  const [userLoanDetails, setUserLoanDetails] = useState(null as any)
  const GetUserLoan = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        if (id) {
          const user_loan_id = id[0]
          dispatch(userLoansActions.fetchUserLoanDetails(user_loan_id))
        }
      }
    }, [dispatch, id])
  }
  GetUserLoan()
  useEffect(() => {
    currentState.userLoanDetails && setUserLoanDetails(currentState.userLoanDetails)
  }, [currentState.userLoanDetails])
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])

  return (
    <>
      {isLoading && <LinearProgress />}
      {userLoanDetails ? (
        <Grid container>
          <Toolbar>
            <Typography variant="h6">Investment</Typography>
            <Button>[ICONAccount]</Button>
            <Typography variant="h6">{userLoanDetails.attributes?.user_account?.name}</Typography>
            <Button>+</Button>
          </Toolbar>

          <Grid item xs={12}>
            <Paper variant="outlined">
              <Typography>Market: {userLoanDetails.attributes?.market}</Typography>
              <Typography>Investment amount: {userLoanDetails.attributes?.investment_amount}</Typography>
              <Typography>Slice: {userLoanDetails.attributes?.slice_name}</Typography>
              <Typography>Invest mode: {userLoanDetails.attributes?.invest_mode}</Typography>
              <Typography>Date in: {userLoanDetails.attributes?.date_in}</Typography>
              <Typography>Date out: {userLoanDetails.attributes?.date_out}</Typography>
              <Typography>Position: {userLoanDetails.attributes?.position}</Typography>
              <Typography>XIRR: {userLoanDetails.attributes?.xirr}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Cashflow</Typography>
          </Grid>
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">You are not invested in this loan</Typography>
            <button>Create an account</button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
