import React, { useState } from 'react'
import { Toolbar, Dialog, DialogActions, DialogContent, Typography, Button, Grid, ButtonGroup } from '@material-ui/core'
import CountryForm from './Form/countryForm'

const CountryToolbar = () => {
  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const body = (
    <>
      <Typography variant="h4">Add Country</Typography>
      <CountryForm />
    </>
  )
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h5">Countries List</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button variant="outlined" id="add" onClick={handleToggle}>
            +
          </Button>
        </Grid>
        <Dialog open={open} onClose={handleToggle}>
          <DialogContent>{body}</DialogContent>
          <DialogActions>
            <Button onClick={handleToggle} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Toolbar>
  )
}

export default CountryToolbar
