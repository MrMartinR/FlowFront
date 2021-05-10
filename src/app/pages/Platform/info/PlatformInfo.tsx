import React from 'react'
import { Grid, Card, CardContent, Typography, CardHeader, ButtonGroup, Button } from '@material-ui/core/'

export const PlatformInfo = (props: any) => {
  const { platformDetails } = props
  return (
    <>
      <Grid container direction="row" justify="space-between" spacing={2}>
        <Grid item xs={1}></Grid>
        <Grid container direction="column" item xs={3}>
          <Card>
            <CardHeader title="Status"></CardHeader>
            <CardContent>
              <Typography>{platformDetails.attributes?.status}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Type"> </CardHeader>
            <CardContent>
              <Typography>{platformDetails.attributes?.category}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Details"> </CardHeader>
            <CardContent>
              <Typography>Term: {platformDetails.attributes?.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {platformDetails.attributes?.liquidity}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Company"> </CardHeader>
            <CardContent>
              <Typography>Profitable: {platformDetails.attributes?.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" item xs={4}>
          <Card>
            <CardHeader title="Accounts"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.attributes?.account_category}
                <Button>Personal</Button>
                <Button>Corporate</Button>
                <Button>Accredited</Button>
              </ButtonGroup>
              <Typography>IFISA: {platformDetails.attributes?.ifisa}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Agreement Structure"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.attributes?.structure}
                <Button>Indirect</Button>
                <Button>Direct</Button>
                <Button>Bilateral</Button>
              </ButtonGroup>
              <Typography>Taxes: {platformDetails.attributes?.taxes}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Protection Scheme"> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {platformDetails.attributes?.protection_scheme}
                <Button>BuyBack</Button>
                <Button>Provision Fund</Button>
                <Button>Personal</Button>
                <Button>Collateral</Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction="column" item xs={3}>
          <Card>
            <CardHeader title="Investment Details"> </CardHeader>
            <CardContent>
              <Typography>Invest Mode: </Typography>
              <ButtonGroup>
                {platformDetails.attributes?.invest_mode}
                <Button>Bid</Button>
                <Button>Manual</Button>
                <Button>Preset</Button>
                <Button>Auto</Button>
              </ButtonGroup>
              <Typography>Secondary Market: {platformDetails.attributes?.secondary_market}</Typography>
              <Typography>SM Notes: {platformDetails.attributes?.sm_notes}</Typography>
              <Typography>Cost: {platformDetails.attributes?.cost}</Typography>
              <Typography>Min. Investment: {platformDetails.attributes?.min_investment}</Typography>
              <Typography>Cashflow options: {platformDetails.attributes?.cashflow_options}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Promotions"> </CardHeader>
            <CardContent>
              <Typography>Welcome bonus: {platformDetails.attributes?.welcome_bonus}</Typography>
              <Typography>Promo: {platformDetails.attributes?.promo}</Typography>
              <Typography>Promo end: {platformDetails.attributes?.promo_end}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  )
}
