import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchUserLoanDetails } from './state/userLoansActions'

const UserLoanDetails = (props: any) => {
  const { fetchUserLoanDetails, loan_id } = props
  const { userLoanDetails, loading } = props.userLoans

  useEffect(() => {
    fetchUserLoanDetails(loan_id)
  }, [loan_id])

  return (
    <>
      {!loading && !userLoanDetails ? (
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
      ) : (
        <div style={{ width: '100%', display: 'flex' }}>
          <div style={{ width: '20%' }}></div>
          <div style={{ width: '60%', textAlign: 'center' }}>
            <Grid>
              <CardContent>
                <Typography variant="h3">User Loan Details</Typography>
              </CardContent>
            </Grid>

            <Grid container direction="row" justify="space-between" spacing={2}>
              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Market: {userLoanDetails.market}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Investment amount: {userLoanDetails.investment_amount}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction="row" justify="space-between" spacing={2}>
              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Slice: {userLoanDetails.slice_name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Invest mode: {userLoanDetails.invest_mode}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction="row" justify="space-between" spacing={2}>
              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Date in: {userLoanDetails.date_in}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Date out: {userLoanDetails.date_out}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction="row" justify="space-between" spacing={2}>
              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Position: {userLoanDetails.position}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid container direction="column" xs={6}>
                <Grid>
                  <Card>
                    <CardContent>
                      <Typography>Xirr: {userLoanDetails.xirr}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </div>
          <div style={{ width: '20%' }}></div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userLoans: state.userLoans,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserLoanDetails: (loan_id: any) => dispatch(fetchUserLoanDetails(loan_id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoanDetails)
