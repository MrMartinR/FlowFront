import { Grid, CardContent, Typography, Button, Card, LinearProgress, Container, makeStyles, CardHeader } from '@material-ui/core/'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as userLoansActions from './../UserLoan/state/userLoansActions'
/* styles */
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
  },
  cardHeaderAction: {
    margin: 'auto' /* adds margin on top of the elements */,
  },
})
export const UserLoanDetails = (props: any) => {
  const classes = useStyles()
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
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <CardHeader title={'Investment ' /*userLoanDetails.attributes?.user_account?.name*/} action={<span><Button>[ICONAccount]</Button><Button>+</Button></span>} fullwidth />
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
                <CardContent>
                  
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">You are not invested in this loan</Typography>
            <Button>Create an account</Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
