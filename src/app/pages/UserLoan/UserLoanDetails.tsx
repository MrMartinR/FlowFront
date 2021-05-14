import { Grid, Paper, CardContent, Typography, Toolbar, Button } from '@material-ui/core/'
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import * as userLoansActions from './../UserLoan/state/userLoansActions'

export const UserLoanDetails = (props: any) => {
  const { id } = props;
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userLoans,
    }),
    shallowEqual
  )
  const [isLoading, setIsLoading] = useState(false);
  const [userLoanDetails, setUserLoanDetails] = useState({} as any);
  const GetUserLoan = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(userLoansActions.fetchUserLoanDetails(id));
      } 
    }, [dispatch]);
  }
  GetUserLoan();
  useEffect(() => {
    currentState.userLoanDetails &&
    setUserLoanDetails(currentState.userLoanDetails);
  }, [currentState.userLoanDetails])
  useEffect(() => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  if (!isLoading && userLoanDetails!=={}) {
    return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '20%' }}></div>
        <div style={{ width: '60%', textAlign: 'center' }}>
          <Grid>
            <CardContent>
              <Typography variant="h5">You are not invested in this loan</Typography>
              <button>Create an account</button>
            </CardContent>
          </Grid>
        </div>
        <div style={{ width: '20%' }}></div>
      </div>
    )
  }

  return (
    <>
      <Grid container>
        <Toolbar title="Investment">
          <Typography variant="h6">Investment</Typography>
          <Button>[ICONAccount]</Button>
          <Typography variant="h6">[account.contacts.trade_name]</Typography>
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
    </>
  )
}
