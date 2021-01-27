import React from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, ButtonGroup, Button } from '@material-ui/core/'

const PlatformInfo = (props: any) => {
  const { platformDetails } = props
  return (
    <>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Grid xs={1}></Grid>
        <Grid container direction="column" xs={3}>
          <Card>
            <CardHeader title="Status"></CardHeader>
            <CardContent>
              <Typography>{platformDetails.status}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Type"> </CardHeader>
            <CardContent>
              <Typography>{platformDetails.category}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Details"> </CardHeader>
            <CardContent>
              <Typography>Term: {platformDetails.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {platformDetails.liquidity}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Company"> </CardHeader>
            <CardContent>
              <Typography>Profitable: {platformDetails.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" xs={4}>
          <Card>
            <CardHeader title="Accounts"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.account_category}
                <Button>Personal</Button>
                <Button>Corporate</Button>
                <Button>Accredited</Button>
              </ButtonGroup>
              <Typography>IFISA: {platformDetails.ifisa}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Agreement Structure"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.structure}
                <Button>Indirect</Button>
                <Button>Direct</Button>
                <Button>Bilateral</Button>
              </ButtonGroup>
              <Typography>Taxes: {platformDetails.taxes}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Protection Scheme"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.protection_scheme}
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
                {platformDetails.invest_mode}
                <Button>Bid</Button>
                <Button>Manual</Button>
                <Button>Preset</Button>
                <Button>Auto</Button>
              </ButtonGroup>
              <Typography>Secondary Market: {platformDetails.secondary_market}</Typography>
              <Typography>SM Notes: {platformDetails.sm_notes}</Typography>
              <Typography>Cost: {platformDetails.cost}</Typography>
              <Typography>Min. Investment: {platformDetails.min_investment}</Typography>
              <Typography>Cashflow options: {platformDetails.cashflow_options}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Promotions"> </CardHeader>
            <CardContent>
              <Typography>Welcome bonus: {platformDetails.welcome_bonus}</Typography>
              <Typography>Promo: {platformDetails.promo}</Typography>
              <Typography>Promo end: {platformDetails.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={1}></Grid>
      </Grid>
    </>
  )
}

export default PlatformInfo
