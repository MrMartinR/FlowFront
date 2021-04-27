import React, { useState, useEffect } from 'react'
import VerticalLinearStepper from './ContactStepper'
import { useDispatch } from 'react-redux'
import * as contactsActions from './state/contactsActions'
/* eslint-disable no-restricted-imports*/
import {
  Typography,
  ListItemText,
  CardContent,
  Card,
  List,
  Grid,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { ContactEdit } from './ContactEdit'

export const ContactDetails = (props: any) => {
  const { selectedContact } = props
  const err = ''
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [res, setres] = useState(false)
  const flag = selectedContact.attributes?.country?.iso_code;

  const handleOpen = (e: any, value: any) => {
    if (value==='edit') setEdit(true);
    if (value==='delete') setEdit(false);
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setres(true)
  }
  let dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      if (res === true) {
        await dispatch(contactsActions.deleteContact(selectedContact.id))
        setOpen(false);
      }
    })()
    // eslint-disable-next-line
  }, [dispatch, res])

  const body = (
    (edit===true)?(
        <>
          <Typography variant="h4" id="simple-modal-title">Edit Contact</Typography>
          <ContactEdit selectedContact = { selectedContact } setOpen= { setOpen }/>
        </>
      ):(<>
          <Typography variant="h4" paragraph id="simple-modal-title">Delete Contact</Typography>
          <Typography variant="body1">Are you sure you want to delete the contact?</Typography>
          <Button onClick={handleDelete} variant = 'contained' color="secondary" autoFocus>
          Agree
        </Button>
        </>
      )
    
  )

  return (
    <>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
      <Card>
        <CardContent>
        <Grid item xs = {12} direction="row" container>
          <Button variant = 'contained' color = 'primary'>
            <EditIcon onClick={(e) => handleOpen(e, 'edit')}></EditIcon>
          </Button>
          <Button variant = 'contained' color = 'primary'>
            <DeleteIcon onClick={(e) => handleOpen(e, 'delete')}></DeleteIcon>
          </Button>
          </Grid>
          <Grid item xs = {12} direction="row" container>
            <Grid item xs = { 4 } direction="column" alignItems='center' container>
              <Grid item xs = {6} >
                <Avatar variant="square">ICON</Avatar>
              </Grid>
              <Grid item xs = {6}>
                <Avatar variant="square"><img src={'/media/svg/flags/'+flag+'.svg'} alt="" /></Avatar>
              </Grid>
              
            </Grid>
            <Grid item xs = { 8 }>
              {selectedContact.attributes?.kind?.toUpperCase() === 'COMPANY' ? (
                <List>
                  <ListItemText primary={` ${selectedContact.attributes?.trade_name || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.company_name || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.id_number || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.founded || err}`} />
                </List>
              ) : (
                <List>
                  <ListItemText primary={` ${selectedContact.attributes?.name || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.surname || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.nick || err}`} />
                  <ListItemText primary={` ${selectedContact.attributes?.id_number || err}`} />
                </List>
              )}
            </Grid>  
          </Grid>
          <Typography variant="body2">
          {`${selectedContact.attributes?.description || err}`}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
