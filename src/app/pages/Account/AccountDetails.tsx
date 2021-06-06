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
  CardHeader,
  Avatar,
  ButtonGroup,
  makeStyles,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'
import * as accountsActions from './state/accountsActions'
import { AccountEdit } from './AccountEdit'
/* styles */
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
  },
  cardHeaderAction: {
    margin: 'auto' /* adds margin on top of the elements */,
  },
})
export const AccountDetails = (props: any) => {
  /* styles */
  const classes = useStyles()
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
        <AccountEdit selectedAccount={selectedAccount} handleClose={handleClose} />
      </>
    ) : (
      <>
        <Typography variant="h4" paragraph>
          Delete Account
        </Typography>
        <Typography variant="body1">Are you sure you want to delete the account?</Typography>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" disabled color="secondary" autoFocus>
            Agree
          </Button>
        </Grid>
      </>
    )
  return (
    <>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </>
      <Card>
        <CardContent>
          <Grid container direction="row">
            <Grid item xs={12} className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    variant="square"
                    src={'/media/svg/contact/icons/' + id + '.svg'}
                    alt={selectedAccount.attributes?.contact?.trade_name}
                  />
                }
                title={selectedAccount.attributes?.contact?.trade_name}
                subheader={selectedAccount.attributes?.contact?.company_name}
                action={
                  <>
                    <ButtonGroup>
                      <Button variant="contained" color="primary" href={`/contacts/${id}`}>
                        Contact
                      </Button>
                      <Button variant="contained" color="primary">
                        <EditIcon onClick={(e) => handleOpen(e, 'edit')}></EditIcon>
                      </Button>
                      <Button variant="contained" color="primary">
                        <DeleteIcon onClick={(e) => handleOpen(e, 'delete')}></DeleteIcon>
                      </Button>
                    </ButtonGroup>
                  </>
                }
                classes={{
                  action: classes.cardHeaderAction,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
