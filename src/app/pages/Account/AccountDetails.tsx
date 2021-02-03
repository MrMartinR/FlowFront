import React from 'react'
/* eslint-disable no-restricted-imports*/
import {
  Typography,
  CardContent,
  Card,
  List,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

export const AccountDetails = (props: any) => {
  const { selectedContact } = props
  const err = 'Not Found'
  const [open, setOpen] = React.useState(false)

  const handleOpen = (e: any, value: any) => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const body = (
    <>
      <Typography variant="h4" id="simple-modal-title">
        Edit Contact
      </Typography>
      <Typography variant="body1" id="simple-modal-description">
        add and edit contact form
      </Typography>
    </>
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
          <EditIcon onClick={(e) => handleOpen(e, 'edit')}></EditIcon>
          <Grid>
            <Grid item md={12}>
              <Grid direction="row" justify="space-evenly" container>
                <></>
                <>
                  <List>
                    <Typography variant="h6">Account Details</Typography>
                    {/* <ListItemText primary={` ${selectedContact.name}`} />
                      <ListItemText primary={` ${selectedContact.surname}`} />
                      <ListItemText primary={` ${selectedContact.id_number}`} />
                      <ListItemText primary={` ${selectedContact.nick}`} /> */}
                  </List>
                </>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
