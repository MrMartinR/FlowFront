import React from 'react'
/* eslint-disable no-restricted-imports*/
import {
  Typography,
  ListItemText,
  CardContent,
  Card,
  List,
  Chip,
  Grid,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

export const ContactDetails = (props: any) => {
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
          <Typography variant='h4' id='simple-modal-title'>
            Edit Contact
          </Typography>
          <Typography variant='body1' id='simple-modal-description'>
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
            <Button onClick={handleClose} variant='contained'>
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
              <Grid direction='row' justify='space-evenly' container>
                <>
                  <Avatar variant='square'>ICON</Avatar>
                  <Avatar variant='square'>FLAG</Avatar>
                </>
                <>
                  {selectedContact.kind === 'Company' ? (
                    <List>
                      <Typography variant='h6'>Company</Typography>
                      <ListItemText
                        primary={` ${selectedContact.trade_name || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.company_name || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.id_number || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.founded || err}`}
                      />
                    </List>
                  ) : (
                    <List>
                      <Typography variant='h6'>Individual</Typography>
                      <ListItemText
                        primary={` ${selectedContact.name || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.surname || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.id_number || err}`}
                      />
                      <ListItemText
                        primary={` ${selectedContact.nick || err}`}
                      />
                    </List>
                  )}
                </>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant='body2' component='p'>
            {`${selectedContact.description || err}`}
          </Typography>
        </CardContent>
        <CardContent>
          <Chip label={`${selectedContact.tags || err}`} />
          <Chip label={`${selectedContact.tags || err}`} />
        </CardContent>
      </Card>
    </>
  )
}
