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
  InputLabel,
} from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import IconOption from '../../../common/layout/components/icons/Option'
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
  inputLabel: {
    marginRight: 'auto',
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
                <CardHeader title={'Investment'} />
                <CardContent>
                  <Grid container justify='space-between'>
                    <InputLabel>Market</InputLabel>
                    <Typography>{userLoanDetails.attributes?.market}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Investment Amount</InputLabel>
                    <Typography>{userLoanDetails.attributes?.investment_amount.toFixed(2)}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Slice</InputLabel>
                    <Typography>{userLoanDetails.attributes?.slice_name}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Invest Mode</InputLabel>
                    <Typography>{userLoanDetails.attributes?.invest_mode}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Date In</InputLabel>
                    <Typography>{userLoanDetails.attributes?.date_in}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Date Out</InputLabel>
                    <Typography>{userLoanDetails.attributes?.date_out}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>Position</InputLabel>
                    <Typography>{userLoanDetails.attributes?.position}</Typography>
                  </Grid>
                  <Grid container justify='space-between'>
                    <InputLabel>XIRR</InputLabel>
                    <Typography>{(userLoanDetails.attributes?.xirr * 100).toFixed(2)}</Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardHeader
                  title="Cashflow"
                  action={
                    <Button>
                      <IconOption />
                    </Button>
                  }
                />
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
            <Grid container direction="column" justify='space-between'>
              <Typography variant="h5">You haven't invested in this loan</Typography>
              <Button>Add Loan to your Portfolio</Button>
            </Grid>
          </CardContent>
        </Card>
      )}
    </>
  )
}
