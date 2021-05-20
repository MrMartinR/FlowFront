import React, { useState } from 'react'
/* eslint-disable no-restricted-imports*/
import { Typography, Card, Grid, Button, Dialog, DialogContent, DialogActions, CardContent, List, ListItemText } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import * as accountsActions from './state/accountsActions'
import { AccountEdit } from './AccountEdit'
export const AccountDetails = (props: any) => {
  const { selectedAccount } = props
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const id = selectedAccount.attributes?.contact?.id||'';
  const handleOpen = (e: any, value: any) => {
    if (value==='edit') setEdit(true);
    if (value==='delete') setEdit(false);
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(accountsActions.deleteAccount(selectedAccount?.id))
    handleClose();
  }
  const body = (
    (edit===true)?(
        <>
          <Typography variant="h4" id="simple-modal-title">Edit Account</Typography>
          <AccountEdit selectedAccount = { selectedAccount } setOpen= { setOpen }/>
        </>
      ):(<>
          <Typography variant="h4" paragraph id="simple-modal-title">Delete Account</Typography>
          <Typography variant="body1">Are you sure you want to delete the account?</Typography>
          <Button onClick={handleDelete} variant = 'contained' disabled color="secondary" autoFocus>
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
          <Grid container direction='row'>
            <Grid item xs={8}>
              <Typography variant="h6">Account Details</Typography>
            </Grid>
            <Grid item xs={4}>
            <Button variant='contained' color='primary' href={`/contacts/${id}`}>
              Contact
            </Button>
            <Button variant = 'contained' color = 'primary'>
              <EditIcon onClick={(e) => handleOpen(e, 'edit')}></EditIcon>
            </Button>
            <Button variant = 'contained' color = 'primary'>
              <DeleteIcon onClick={(e) => handleOpen(e, 'delete')}></DeleteIcon>
            </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
        <Grid container direction='column'>
          <List>
            <ListItemText primary={` Name: ${selectedAccount.attributes?.contact?.trade_name || ''}`} />
            <ListItemText primary={` Category: ${selectedAccount.attributes?.category || ''}`} />
            <ListItemText primary={` Platform Status: ${selectedAccount.attributes?.platform_status || ''}`} />
          </List>
        </Grid>
        </CardContent>
      </Card>
    </>
  )
}
