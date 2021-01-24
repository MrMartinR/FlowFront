import React from 'react'
import { Grid, InputBase, Typography, Toolbar } from '@material-ui/core/'

const PlatformListToolbar = () => {
  return (
    <Toolbar variant='dense'>
      <Grid container direction='row' justify='space-between'>
        <Grid item xs={4}>
          <Typography variant='h5'>Platforms</Typography>
        </Grid>
        <Grid item xs={2}>
          <InputBase placeholder='Search…' />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default PlatformListToolbar
