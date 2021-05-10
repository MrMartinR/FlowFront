import React, { useState } from 'react'
import { Toolbar, Dialog, Popover, DialogActions, DialogContent, Typography, Button, Grid, ButtonGroup } from '@material-ui/core'
import VerticalLinearStepper from './ContactStepper'
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useHistory } from 'react-router';
/**
 * The contact top bar nav
 * holder the add contact componet
 */
export const ContactToolBar = (props: any) => {
  const { selectedContact } = props;
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openedPopoverId, setOpenedPopoverId] = useState(null);
  const linkTo = useHistory()
  const handleOpen = (e: any, value: any, itm = null) => {
    setOpen(true);
  }
  const handleOriginator = () => {
    console.log(JSON.stringify(selectedContact?.attributes?.originator, null, 3));
  }

  const handlePlatform = () => {
    linkTo.push(`/platforms/${selectedContact.attributes.platform.id}`);
  }
  const handleClose = () => {
    setOpen(false);
  }
  
  const handleClick = (e:React.MouseEvent<HTMLButtonElement>, id:any) => {
    setAnchorEl(e.currentTarget);
    setOpenedPopoverId(id);
  }
  // Popover
  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  }
  const id = open ? 'simple-popover' : undefined
  const body = (
    <>
      <Typography variant="h4">Add Contact</Typography>
      <VerticalLinearStepper selectedContact = { selectedContact } edit = { false } setOpen = { setOpen } />
    </>
  )
  return (
    <>
      <Toolbar variant="dense">
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={8}>
            <Typography variant="h6">Contacts</Typography>
          </Grid>
          <Grid item xs={4} direction="row" container>
            <ButtonGroup>
              {(selectedContact?.attributes?.platform !== null)&&<Button variant='outlined' onClick={ handlePlatform }>Platform</Button>}
              {(selectedContact?.attributes?.originator !== null)&&<Button variant='outlined' onClick={ handleOriginator }>Originator</Button>}
            </ButtonGroup>
            <Button variant="outlined" id="add" onClick={(e) => handleOpen(e, 'add')}>
              +
            </Button>
            <Button onClick={(e)=>handleClick(e, 1)} aria-describedby={id}>
            { selectedContact?.attributes?.visibility==='Public'
              ?<LockOpenIcon fontSize='large'/>
              :<LockIcon fontSize='large'/> }
            </Button>
            <Popover
                  id={id}
                  open={ openedPopoverId === 1}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  { selectedContact?.attributes?.visibility==='Public'
                      ?<Typography variant="body1">This contact is public</Typography>
                      :<Typography variant="body1">This contact is private, only you have access</Typography> }
            </Popover>

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
