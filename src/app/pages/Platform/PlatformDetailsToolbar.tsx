import React from 'react'
import { Grid, Button, Typography, Toolbar, Link } from '@material-ui/core/'

const PlatformDetailsToolbar = () => {
  return (
    <Toolbar>
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">[Icon][TradeName]{/* {platformDetails.contact.trade_name} */}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button>Contact</Button>
          <Button>Originators</Button>
          <Button>Loans</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default PlatformDetailsToolbar
