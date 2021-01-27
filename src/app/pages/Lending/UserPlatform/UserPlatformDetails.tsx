import React from 'react'
import { connect } from 'react-redux'

import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
  ButtonGroup,
  Button
} from '@material-ui/core'

const UserPlatformsDetails = (props: any) => {
  const { userPlatformDetails, loading } = props.userPlatforms
  const notfound = 'Not found'

  if (loading) {
    return (
      <>
        <Typography variant='h6'>Loading...</Typography>
      </>
    )
  }

  return (
    <>
        <CardHeader title='User Platform Performance'></CardHeader>


        <Grid container direction='row' justify='space-between' spacing={2}>
        <Grid container direction='column' xs={6}>
          <Card>
            <CardHeader title='Status'></CardHeader>
            <CardContent>
              <Typography>{userPlatformDetails.platform.status}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title='Type'> </CardHeader>
            <CardContent>
              <Typography>{userPlatformDetails.platform.category}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title='Details'> </CardHeader>
            <CardContent>
              <Typography>Term: {userPlatformDetails.platform.term}</Typography>
              <Typography>AIR: </Typography>
              <Typography>Default: </Typography>
              <Typography>Loss: </Typography>
              <Typography>Liquidity: {userPlatformDetails.platform.liquidity}</Typography>
              <Typography>IFISA: {userPlatformDetails.platform.ifisa}</Typography>
              <ButtonGroup>
                {userPlatformDetails.platform.account_category}
                <Button>Personal</Button>
                <Button>Corporate</Button>
                <Button>Accredited</Button>
              </ButtonGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title='Company'> </CardHeader>
            <CardContent>
              <Typography>Profitable: {userPlatformDetails.platform.profitable}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container direction='column' xs={6}>
          <Card>
            <CardHeader title='Agreement Structure'> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {userPlatformDetails.platform.structure}
                <Button>Indirect</Button>
                <Button>Direct</Button>
                <Button>Bilateral</Button>
              </ButtonGroup>
              <Typography>Taxes: {userPlatformDetails.platform.taxes}</Typography>
              <Typography>
                Welcome bonus: {userPlatformDetails.platform.welcome_bonus}
              </Typography>
              <Typography>Promo: {userPlatformDetails.platform.promo}</Typography>
              <Typography>Promo end: {userPlatformDetails.platform.promo_end}</Typography>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title='Protection Scheme'> </CardHeader>
            <CardContent>
              <ButtonGroup>
                {userPlatformDetails.platform.protection_scheme || notfound}
                <Button>BuyBack</Button>
                <Button>Provision Fund</Button>
                <Button>Personal</Button>
                <Button>Collateral</Button>
              </ButtonGroup>
            </CardContent>
            <CardContent>
              <Typography>Invest Mode: </Typography>
                <ButtonGroup>
                  {userPlatformDetails.platform.invest_mode}
                  <Button>Bid</Button>
                  <Button>Manual</Button>
                  <Button>Preset</Button>
                  <Button>Auto</Button>
                </ButtonGroup>
                <Typography>
                  Secondary Market: {userPlatformDetails.platform.secondary_market}
                </Typography>
                <Typography>SM Notes: {userPlatformDetails.platform.sm_notes}</Typography>
                <Typography>Cost: {userPlatformDetails.platform.cost}</Typography>
                <Typography>
                  Min. Investment: {userPlatformDetails.platform.min_investment}
                </Typography>
                <Typography>
                  Cashflow options: {userPlatformDetails.platform.cashflow_options}
                </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userPlatforms: state.userPlatforms,
  }
}

export default connect(mapStateToProps)(UserPlatformsDetails)
