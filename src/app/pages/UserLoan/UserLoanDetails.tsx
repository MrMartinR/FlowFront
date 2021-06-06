import {
  Grid,
  CardContent,
  Typography,
  Button,
  Card,
  LinearProgress,
  Container,
  makeStyles,
  CardHeader,
} from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import * as userLoansActions from './../UserLoan/state/userLoansActions'
/* styles */
const useStyles = makeStyles({
  root: {
    width: '40%',
    padding: 0,
    margin: 'auto',
  },
})
export const UserLoanDetails = (props: any) => {
  const classes = useStyles()
  const { id } = props
  const [isLoading, setIsLoading] = useState(false)
  const [userLoanDetails, setUserLoanDetails] = useState(null as any)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userLoans,
    }),
    shallowEqual
  )
  // peticions dos details do user loan
  useEffect(() => {
    if (id) {
      const user_loan_id = id[0]
      dispatch(userLoansActions.fetchUserLoanDetails(user_loan_id))
    }
  }, [dispatch, id])
  // recibida resposta carganse do state
  useEffect(() => {
    currentState.userLoanDetails && setUserLoanDetails(currentState.userLoanDetails)
  }, [currentState.userLoanDetails])
  // actualizanse os flags cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  // funcion que se pasa como parametro o snackbar para resetear a mensaxe
  const resetSuccess = () => {
    dispatch(userLoansActions.resetSuccess())
  }
  return (
    <>
      {isLoading && <LinearProgress />}
      {userLoanDetails ? (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title={'Investment ' /*userLoanDetails.attributes?.user_account?.name*/}
                  action={
                    <span>
                      <Button>[ICONAccount]</Button>
                      <Button>+</Button>
                    </span>
                  }
                  fullwidth
                />
                <CardContent>
                  <Typography>Market: {userLoanDetails.attributes?.market}</Typography>
                  <Typography>Investment amount: {userLoanDetails.attributes?.investment_amount}</Typography>
                  <Typography>Slice: {userLoanDetails.attributes?.slice_name}</Typography>
                  <Typography>Invest mode: {userLoanDetails.attributes?.invest_mode}</Typography>
                  <Typography>Date in: {userLoanDetails.attributes?.date_in}</Typography>
                  <Typography>Date out: {userLoanDetails.attributes?.date_out}</Typography>
                  <Typography>Position: {userLoanDetails.attributes?.position}</Typography>
                  <Typography>XIRR: {userLoanDetails.attributes?.xirr}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader title="Cashflow" action={<Button>•••</Button>} fullwidth />
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
          <UserAlert
            resetSuccess={resetSuccess}
            success={currentState.success}
            message={currentState.message}
            error={currentState.error}
          />
        </Container>
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Grid container direction="column" alignItems="center">
              <Typography variant="h5">You are not invested in this loan</Typography>
              <Button>Create an account</Button>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  )
}
