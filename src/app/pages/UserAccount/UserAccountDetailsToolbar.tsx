import React from 'react'
import { Grid, Button, Typography, Toolbar } from '@material-ui/core/'

const UserAccountDetailsToolbar = () => {
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="body1">[ICON]</Typography>
          <Typography variant="body1">[trade_name]</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6">Value</Typography>
          <Typography variant="h6">Balance</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button>+ New Transfer</Button>
          <Button>+ New Transaction</Button>
          <Button>•••</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default UserAccountDetailsToolbar
