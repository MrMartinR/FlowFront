import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, ButtonGroup, Button } from '@material-ui/core/'
import { connect } from 'react-redux'
import { fetchLoanDetails } from '../state/loansActions'

const LoanDetails = (props: any) => {
  const { fetchLoanDetails, id } = props
  const { loanDetails, loading } = props.loans

  useEffect(() => {
    fetchLoanDetails(id)
  }, [id])

  return (
    <>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Grid xs={1}></Grid>
        <Grid container direction="column" xs={3}>
          <Card>
            <CardHeader title="Status"></CardHeader>
            <CardContent>
              <Typography>{loanDetails.status}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Type"> </CardHeader>
            <CardContent>
              <Typography>{loanDetails.category}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Details"> </CardHeader>
            <CardContent>
              <Typography>Term: {loanDetails.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {loanDetails.liquidity}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Company"> </CardHeader>
            <CardContent>
              <Typography>Profitable: {loanDetails.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" xs={4}>
          <Card>
            <CardHeader title="Accounts"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {loanDetails.account_category}
                <Button>Personal</Button>
                <Button>Corporate</Button>
                <Button>Accredited</Button>
              </ButtonGroup>
              <Typography>IFISA: {loanDetails.ifisa}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Agreement Structure"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {loanDetails.structure}
                <Button>Indirect</Button>
                <Button>Direct</Button>
                <Button>Bilateral</Button>
              </ButtonGroup>
              <Typography>Taxes: {loanDetails.taxes}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Protection Scheme"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {loanDetails.protection_scheme}
                <Button>BuyBack</Button>
                <Button>Provision Fund</Button>
                <Button>Personal</Button>
                <Button>Collateral</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" xs={3}>
          <Card>
            <CardHeader title="Investment Details"> </CardHeader>
            <CardContent>
              <Typography>Invest Mode: </Typography>
              <ButtonGroup>
                {loanDetails.invest_mode}
                <Button>Bid</Button>
                <Button>Manual</Button>
                <Button>Preset</Button>
                <Button>Auto</Button>
              </ButtonGroup>
              <Typography>Secondary Market: {loanDetails.secondary_market}</Typography>
              <Typography>SM Notes: {loanDetails.sm_notes}</Typography>
              <Typography>Cost: {loanDetails.cost}</Typography>
              <Typography>Min. Investment: {loanDetails.min_investment}</Typography>
              <Typography>Cashflow options: {loanDetails.cashflow_options}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Promotions"> </CardHeader>
            <CardContent>
              <Typography>Welcome bonus: {loanDetails.welcome_bonus}</Typography>
              <Typography>Promo: {loanDetails.promo}</Typography>
              <Typography>Promo end: {loanDetails.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={1}></Grid>
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
