import React, { useEffect } from 'react'
import { Grid, Card, CardHeader, CardContent, Typography, ButtonGroup, Button } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchLoanDetails } from '../state/loansActions'

const LoanDetails = (props: any) => {
  const { fetchLoanDetails, id } = props
  const { loanDetails } = props.loans
  const [data, setData] = React.useState([] as any)

  const processData = (obj: any) => {
    let data = {} as any
    for (const property in obj) {
      data[`${property}`] = property === 'country' || property === 'currency' ? obj[property].name : obj[property]
    }
    return data
  }

  useEffect(() => {
    fetchLoanDetails(id)
  }, [id])

  useEffect(() => {
    setData(processData(loanDetails))
  }, [loanDetails])

  return (
    <>
      <Grid container direction="row">
        <Grid container direction="column" xs={6}>
          <Grid item direction="row">
            <Card>
              <CardHeader title="Description"></CardHeader>
              <CardContent>
                <Typography>Borrower Type: {data.borrower_type}</Typography>
                <Typography>{data.borrower}</Typography>
                <Typography>Category: {data.category}</Typography>
                <Typography>Description: {data.description}</Typography>
                {/* Only show if Borrower = Consumer */}
                <Typography>DTI: {data.dti_rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item direction="row">
            <Card>
              <CardHeader title="Notes"></CardHeader>
              <CardContent>
                <Typography>{data.notes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container direction="column" xs={6}>
          <Grid item direction="row">
            <Card>
              <CardHeader title="Details"></CardHeader>
              <CardContent>
                <Typography>Amortization: {data.amortization}</Typography>
                <Typography>Installment: {data.installment}</Typography>
                <Typography>Air: {data.air}</Typography>
                <Typography>XIRR: {data.xirr}</Typography>
                <Typography>Amount: {data.amount}</Typography>
                <Typography>Term: [Calculation]</Typography>
                <Typography>Remaining: [Calculation]</Typography>
                <Typography>Date listed: {data.date_listed}</Typography>
                <Typography>Date issued: {data.date_issued}</Typography>
                <Typography>Date maturity: {data.date_maturity}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item direction="row">
            <Card>
              <CardHeader title="Security"></CardHeader>
              <CardContent>
                <ButtonGroup>
                  <Button>BuyBack</Button>
                  <Button>Personal Guarantee</Button>
                  <Button>Collateral</Button>
                </ButtonGroup>
                <Typography>Security details: {data.security_details}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loans: state.loans,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchLoanDetails: (id: any) => dispatch(fetchLoanDetails(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoanDetails)
