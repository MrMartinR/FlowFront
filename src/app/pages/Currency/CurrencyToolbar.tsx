import React from 'react'
import { Toolbar, Typography, Button, Grid } from '@material-ui/core'

/**
 * The currency top bar nav
 * holder the add currency component
 */
export const CurrencyToolBar = () => {
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-evenly">
        <Grid item xs={9}>
          <Typography variant="h6">Currencies</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="outlined" id="add">
            +
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}
export default CurrencyToolBar
