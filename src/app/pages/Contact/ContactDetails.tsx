import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
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
  DialogContent,
  Button,
} from '@material-ui/core'
import { ContactEdit } from './ContactEdit'
import { RootState } from '../../../redux/rootReducer'

/* styles */
const useStyles = makeStyles({
  root: {
    margin: 8,
    padding: 12,
  },
  avatar: {
    background: 'transparent',
    color: '#e6e6e6',
    width: '6em',
    height: '6em',
  },
})

export const ContactDetails = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { selectedContact } = props
  const err = ''
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [canEdit, setCanEdit] = useState(false)
  const flag = selectedContact.attributes?.country?.iso_code
  const dispatch = useDispatch()
  const { authState } = useSelector(
    (state: RootState) => ({
      authState: state.auth,
    }),
    shallowEqual
  )
  // funcion que abre o dialog de edit ou delete
  const handleOpen = (e: any, value: any) => {
    if (value === 'edit') setEdit(true)
    if (value === 'delete') setEdit(false)
    setOpen(true)
  }
  // funcion que pecha o dialog
  const handleClose = () => {
    setOpen(false)
  }
  // funcion que chama a accion de borrar o contact seleccionado
  const handleDelete = () => {
    dispatch(contactsActions.deleteContact(selectedContact.id))
    handleClose()
  }
  // funcion que garda un boolean que indica se o user actual pode editar ou borrar o contact actual
  useEffect(() => {
    if (selectedContact.attributes?.visibility === 'Public') {
      if (authState.role !== 'user') {
        setCanEdit(true)
      } else setCanEdit(false)
    } else {
      if (selectedContact.attributes?.user?.id === authState.user?.id) {
        setCanEdit(true)
      } else setCanEdit(false)
    }
  }, [selectedContact, authState])
  // corpo do dialog de edit ou delete
  const body =
    edit === true ? (
      <>
        <Typography variant="h4">Edit Contact</Typography>
        <ContactEdit selectedContact={selectedContact} handleClose={handleClose} handleOpen={handleOpen}/>
      </>
    ) : (
      <>
        <Typography variant="h4" paragraph>
          Delete Contact
        </Typography>
        <Typography paragraph variant="body1">
          Are you sure you want to delete the contact?
        </Typography>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </Grid>
      </>
    )

  return (
    <>
      {/* edit contact dialog */}
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </>
      {/* contact details */}
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <CardHeader
              title="Details"
              action={
                canEdit && (
                  <Button onClick={(e) => handleOpen(e, 'edit')}>•••</Button>
                )
              }
            />
          </Grid>
        </Grid>
        <CardContent>
          <Grid container>
            <Grid item xs={4}>
              <Avatar
                variant="square"
                src={'/media/svg/contact/icons/' + selectedContact.id + '.svg'}
                className={classes.avatar}
              />
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
                  <ListItemText primary={` ${selectedContact.attributes?.dob || err}`} />
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
