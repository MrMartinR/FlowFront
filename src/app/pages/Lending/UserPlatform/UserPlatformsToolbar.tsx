import { useEffect, useState } from 'react'
import { Grid, Typography, Toolbar, TextField, Button } from '@material-ui/core/'
import { Autocomplete } from '@material-ui/lab';
import * as userPlatformsActions from './../state/userPlatformsActions'
import { useDispatch } from 'react-redux';
export const UserPlatformsToolbar = (props: any) => {
  
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">User Platforms</Typography>
        </Grid>
        <Grid item xs={4}>
            <Button variant="outlined" href="/user-platform-overall">
                Overall Performance
            </Button>
        </Grid>
        
      </Grid>
    </Toolbar>
  )
}
