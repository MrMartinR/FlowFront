import React from 'react'
/* eslint-disable no-restricted-imports*/
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

import {
  Typography,
  ListItemText,
  CardContent,
  Card,
  Divider,
  ListItem,
  List,
  Chip,
  Grid,
  Avatar,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  Button
} from '@material-ui/core'
import { deepOrange, green } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import VerticalLinearStepper from './ContactStepper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'relative',
      overflow: 'auto',
      height: '100%',
      top: 20
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    list: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper
    },
    square: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      margin: 5,
      width: '100%',
      height: '45%'
    },
    add: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500]
    }
  })
)

export const ContactDetails = (props: any) => {
  const { selectedContact } = props
  const classes = useStyles()
  const err = 'Not Found'
  const [open, setOpen] = React.useState(false)
  const [add, setAdd] = React.useState(true)

  const handleOpen = (e: any, value: any) => {
    if (value === 'add') {
      setAdd(true)
    }
    if (value === 'edit') {
      setAdd(false)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const body = (
    <>
      {add === true ? (
        <>
          <h2 id="simple-modal-title">Add Contact</h2>
          <VerticalLinearStepper />
        </>
      ) : (
        <div>
          <h2 id="simple-modal-title">Edit Contact</h2>
          <p id="simple-modal-description">add a edit contact form</p>
        </div>
      )}
    </>
  )

  return (
    <>
      <>
        <Fab className={classes.add} aria-label="add" id="add" onClick={(e) => handleOpen(e, 'add')}>
          <AddIcon />
        </Fab>

        <Fab className={classes.add} aria-label="edit" onClick={(e) => handleOpen(e, 'edit')}>
          <EditIcon />
        </Fab>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Grid container className={classes.root}>
            <Grid item md={12}>
              <Grid direction="row" justify="space-evenly" container>
                <div style={{ width: '50%' }}>
                  <Avatar variant="square" className={classes.square}>
                    ICON
                  </Avatar>
                  <Avatar variant="square" className={classes.square}>
                    FLAG
                  </Avatar>
                </div>
                <div style={{ width: '50%' }}>
                  {selectedContact.kind === 'Company' ? (
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                      <Divider />
                      Company
                      <Divider />
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.trade_name || err}`} />
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.company_name || err}`} />
                      </ListItem>
                      <Divider />
                      <ListItem button divider>
                        <ListItemText primary={` ${selectedContact.id_number || err}`} />
                      </ListItem>
                      <Divider light />
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.founded || err}`} />
                      </ListItem>
                      <Divider />
                    </List>
                  ) : (
                    <List component="nav" className={classes.list} aria-label="mailbox folders">
                      <Divider />
                      Individual
                      <Divider />
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.name || err}`} />
                      </ListItem>
                      <Divider />
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.surname || err}`} />
                      </ListItem>
                      <Divider />
                      <ListItem button divider>
                        <ListItemText primary={` ${selectedContact.id_number || err}`} />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary={` ${selectedContact.nick || err}`} />
                      </ListItem>
                    </List>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="body2" component="p">
            <br />
            {`${selectedContact.description || err}`}
          </Typography>
        </CardContent>
        <Divider />
        <CardContent>
          <Chip label={`${selectedContact.tags || err}`} />
          <Chip label={`${selectedContact.tags || err}`} />
        </CardContent>
      </Card>
    </>
  )
}
