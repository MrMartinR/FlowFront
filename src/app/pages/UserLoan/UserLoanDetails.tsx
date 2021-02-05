import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, ButtonGroup, Button } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchUserLoanDetails } from './state/userLoansActions'

const UserLoanDetails = (props: any) => {
  const { fetchUserLoanDetails, id } = props
  const { userLoanDetails, loading } = props.userLoans

  useEffect(() => {
    fetchUserLoanDetails(id)
  }, [id])

  return (
    <>
      <div style={{ height: 600, width: '100%', display: 'flex' }}>
        <div style={{ height: 600, width: '20%' }}></div>
        <div style={{ height: 600, width: '60%', textAlign: 'center' }}>
          <Grid>
            <CardContent>
              <Typography>User Loan Details</Typography>
            </CardContent>
          </Grid>

          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
                <CardContent>
                  <Typography>Name: {userLoanDetails.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>

        <div style={{ height: 600, width: '20%' }}></div>
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
    fetchUserLoanDetails: (id: any) => dispatch(fetchUserLoanDetails(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoanDetails)
