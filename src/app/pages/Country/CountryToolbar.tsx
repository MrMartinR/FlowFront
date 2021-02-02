import React from 'react'
import { Grid, Button, Typography, Toolbar } from '@material-ui/core/'

const CountryToolbar = () => {
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">Countries List</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button>+</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default CountryToolbar
