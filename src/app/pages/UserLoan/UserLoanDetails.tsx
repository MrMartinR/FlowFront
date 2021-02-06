import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchUserLoanDetails } from './state/userLoansActions'

const UserLoanDetails = (props: any) => {
  const { fetchUserLoanDetails, loan_id } = props
  const { userLoanDetails, loading } = props.userLoans

  const [data, setData] = React.useState([] as any)

  const processData = (obj: any) => {
    let data = {} as any
    for (const property in obj) {
      data[`${property}`] = obj[property]
    }
    return data
  }

  useEffect(() => {
    fetchUserLoanDetails(loan_id)
  }, [loan_id])

  useEffect(() => {
    setData(processData(userLoanDetails))
  }, [userLoanDetails])

  if (!loading && !userLoanDetails) {
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
                    <Typography>Market: {data.market}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="column" xs={6}>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography>Investment amount: {data.investment_amount}</Typography>
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
                    <Typography>Slice: {data.slice_name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="column" xs={6}>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography>Invest mode: {data.invest_mode}</Typography>
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
                    <Typography>Date in: {data.date_in}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="column" xs={6}>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography>Date out: {data.date_out}</Typography>
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
                    <Typography>Position: {data.position}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="column" xs={6}>
              <Grid>
                <Card>
                  <CardContent>
                    <Typography>Xirr: {data.xirr}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div style={{ width: '20%' }}></div>
      </div>
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
