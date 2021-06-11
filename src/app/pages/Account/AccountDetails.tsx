import { useState } from 'react'
import {
  Typography,
  Card,
  Grid,
  Button,
  Dialog,
  DialogContent,
  CardContent,
  List,
  ListItemText,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as accountsActions from './state/accountsActions'
import { AccountEdit } from './AccountEdit'
import { AccountDetailsToolbar } from './AccountDetailsToolbar'
export const AccountDetails = (props: any) => {
  const { selectedAccount } = props
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const id = selectedAccount.attributes?.contact?.id || ''
  // funcion que abre o dialog de edit ou delete
  const handleOpen = (e: any, value: any) => {
    if (value === 'edit') setEdit(true)
    if (value === 'delete') setEdit(false)
    setOpen(true)
  }
  // función para pechar o dialog
  const handleClose = () => {
    setOpen(false)
  }
  // onSubmit do formulario do dialog de delete
  const handleDelete = () => {
    dispatch(accountsActions.deleteAccount(selectedAccount?.id))
    handleClose()
  }
  // corpo do dialog de edit ou delete
  const body =
    edit === true ? (
      <>
        <Typography variant="h4">Edit Account</Typography>
        <AccountEdit selectedAccount={selectedAccount} handleClose={handleClose} handleOpen={handleOpen} />
      </>
    ) : (
      <>
        <Typography variant="h4" paragraph>
          Delete Account
        </Typography>
        <Typography variant="body1">Are you sure you want to delete the account?</Typography>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </Grid>
      </>
    )
  return (
    <>
      <AccountDetailsToolbar selectedAccount={selectedAccount} handleOpen={handleOpen} id={id}/>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </>
      <Card>
        <CardContent>
          <Grid container direction="column">
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
