import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as contactsActions from './state/contactsActions'
/* eslint-disable no-restricted-imports*/
import {
  makeStyles,
  Grid,
  Typography,
  ListItemText,
  Card,
  CardHeader,
  CardContent,
  List,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ContactEdit } from './ContactEdit'

/* styles */
const useStyles = makeStyles({
  root: {
    margin: 24,
  },
})

export const ContactDetails = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { selectedContact } = props
  const err = ''
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const flag = selectedContact.attributes?.country?.iso_code
  const dispatch = useDispatch()

  const handleOpen = (e: any, value: any) => {
    if (value === 'edit') setEdit(true)
    if (value === 'delete') setEdit(false)
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    dispatch(contactsActions.deleteContact(selectedContact.id))
    handleClose()
  }

  const body =
    edit === true ? (
      <>
        <Typography variant="h4">Edit Contact</Typography>
        <ContactEdit selectedContact={selectedContact} setOpen={setOpen} />
      </>
    ) : (
      <>
        <Typography variant="h4" paragraph>
          Delete Contact
        </Typography>
        <Typography variant="body1">Are you sure you want to delete the contact?</Typography>
        <Button onClick={handleDelete} variant="contained" color="secondary" autoFocus>
          Agree
        </Button>
      </>
    )

  return (
    <>
      {/* edit contact dialog */}
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
      {/* contact details */}
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <CardHeader
              title="Details"
              action={
                <ButtonGroup>
                  <Button onClick={(e) => handleOpen(e, 'edit')}>•••</Button>
                  <Button onClick={(e) => handleOpen(e, 'delete')}>
                    <DeleteIcon onClick={(e) => handleOpen(e, 'delete')}></DeleteIcon>
                  </Button>
                </ButtonGroup>
              }
            />
          </Grid>
        </Grid>
        <CardContent>
          <Grid container direction="row">
            <Grid item xs={4}>
              {/* [ToDo] change this for the actual icon  */}
              <Avatar variant="square" src={'/media/svg/contact/icons/' + selectedContact.id + '.svg'}>
                ICON
              </Avatar>
            </Grid>
            <Grid item xs={6}>
              {selectedContact.attributes?.kind === 'Company' ? (
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
            <Grid item xs={2}>
              <Avatar src={'/media/svg/flags/' + flag + '.svg'}></Avatar>
            </Grid>
          </Grid>
          <Typography variant="body2">{`${selectedContact.attributes?.description || err}`}</Typography>
        </CardContent>
      </Card>
    </>
  )
}
