import React, { useEffect } from 'react'
import { Grid, Paper, Input, CardContent, Typography, CardHeader, Toolbar, Button } from '@material-ui/core/'
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
      <Grid container>
        <Toolbar title="Investment">
          <Typography variant="h6">Investment</Typography>
          <Button>[ICONAccount]</Button>
          <Typography variant="h6">[account.contacts.trade_name]</Typography>
          <Button>+</Button>
        </Toolbar>

        <Grid item xs={12}>
          <Paper variant="outlined">
            <Typography>Market: {data.market}</Typography>
            <Typography>Investment amount: {data.investment_amount}</Typography>
            <Typography>Slice: {data.slice_name}</Typography>
            <Typography>Invest mode: {data.invest_mode}</Typography>
            <Typography>Date in: {data.date_in}</Typography>
            <Typography>Date out: {data.date_out}</Typography>
            <Typography>Position: {data.position}</Typography>
            <Typography>XIRR: {data.xirr}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Cashflow</Typography>
        </Grid>
      </Grid>
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
