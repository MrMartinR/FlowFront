import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core/'
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
      <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '20%' }}></div>
        <div style={{ width: '60%', textAlign: 'center' }}>
          <Grid>
            <CardContent>
              <Typography variant="h3">Loan Details</Typography>
            </CardContent>
          </Grid>

          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Name: {data.name}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Borrower type: {data.borrower_type}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Category: {data.category}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Rating: {data.rating}</Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Code: {data.code}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Borrower: {data.borrower}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Installment: {data.installment}</Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Status: {data.status}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Air: {data.air}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Country: {data.country}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Amortization: {data.amortization}</Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          </Grid>

          <Grid container direction="row" justify="space-between" spacing={2}>
            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Amount: {data.amount}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>DTI: {data.dti_rating}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Remaining: </Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Currency: {data.currency}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Description: {data.description}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Date listed: {data.date_listed}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>XIRR: {data.xirr}</Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>

            <Grid container direction="column" xs={4}>
              <Card>
                <Card>
                  <CardContent>
                    <Typography>Date issued: {data.date_issued}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Date maturity: {data.date_maturity}</Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography>Security details: {data.security_details}</Typography>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          </Grid>
          <Card>
            <CardContent>
              <Typography>Notes: {data.notes}</Typography>
            </CardContent>
          </Card>
        </div>

        <div style={{ width: '20%' }}></div>
      </div>
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
