import React from 'react'
import { Toolbar, Dialog, DialogActions, DialogContent, Typography, Button, Grid, ButtonGroup } from '@material-ui/core'
import VerticalLinearStepper from './contactStepper'

/**
 * The contact top bar nav
 * holder the add contact componet
 */
export const ContactToolBar = () => {
  // to be used later=> add
  const [add, setAdd] = React.useState(true)
  const [open, setOpen] = React.useState(false)
  const handleOpen = (e: any, value: any, itm = null) => {
    if (value === 'add') {
      setAdd(true)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const body = (
    <>
      <Typography variant="h4">Add Contact</Typography>
      <VerticalLinearStepper />
    </>
  )
  return (
    <>
      <Toolbar variant="dense">
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={9}>
            <Typography variant="h6">Contacts</Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button>Platform</Button>
              <Button>Originator</Button>
            </ButtonGroup>
            <Button variant="outlined" id="add" onClick={(e) => handleOpen(e, 'add')}>
              +
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>{body}</DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="contained">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Toolbar>
    </>
  )
}
export default ContactToolBar
