import React from 'react'
import {
  AppBar,
  Toolbar, 
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button
} from '@material-ui/core'
import VerticalLinearStepper from './ContactStepper'
import AddIcon from '@material-ui/icons/Add'



export  const ContactAppBar = () => {
  // to be used later
  // eslint-disable-next-line
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
          <Typography variant='h4' id='simple-modal-title'>
            Add Contact
          </Typography>
          <VerticalLinearStepper />
    </>
  )
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" >
            Contacts
          </Typography>
          <>
          <AddIcon id='add' onClick={(e) => handleOpen(e, 'add')}></AddIcon>
            <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant='contained'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
          </>
         
        </Toolbar>
      </AppBar>
    </>
  );
}
export default  ContactAppBar