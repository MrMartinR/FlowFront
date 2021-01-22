import React from 'react'
import {
  
  Toolbar, 
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Button
} from '@material-ui/core'
import VerticalLinearStepper from './contactStepper'
import AddIcon from '@material-ui/icons/Add'


/**
 * The contact top bar nav
 * holder the add contact componet
 */
export  const ContactToolBar = () => {
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
          <Typography variant='h4'>
            Add Contact
          </Typography>
          <VerticalLinearStepper />
    </>
  )
  return (
    <>
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
    </>
  );
}
export default  ContactToolBar