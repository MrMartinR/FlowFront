import React from 'react'
import { Grid, Button, Typography, Toolbar } from '@material-ui/core/'

const PlatformDetailsToolbar = () => {
  return (
    <Toolbar>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant='h5'>Platform Details</Typography>
        </Grid>
        <Grid item xs={8}>
          <Button>Contact</Button>
          <Button>Originators</Button>
          <Button>Loans</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default PlatformDetailsToolbar
