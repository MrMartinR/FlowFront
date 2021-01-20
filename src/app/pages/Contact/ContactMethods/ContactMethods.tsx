import React from 'react'
/* eslint-disable no-restricted-imports*/

import {
  Typography,
  Card,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Avatar from '@material-ui/core/Avatar'
import AssignmentIcon from '@material-ui/icons/Assignment'
import StarIcon from '@material-ui/icons/Star'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import AddContactMethodForm from './AddContactMethodForm'
import EditContactMethodForm from './EditContactMethodForm'

export const ContactMethod = (props: any) => {
  const { methodLoading, listMethods, selectedContact, methodsState } = props
  const err = 'Not Found'
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [open, setOpen] = React.useState(false)
  const [add, setAdd] = React.useState(true)
  const [edit, setEdit] = React.useState(null)

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleOpen = (e: any, value: any, itm = null) => {
    if (value === 'add') {
      setAdd(true)
    }
    if (value === 'edit') {
      setAdd(false)
      setEdit(itm)
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
          <Typography variant='h6' id='simple-modal-title'>
            Add Contact methods
          </Typography>

          <AddContactMethodForm selectedContact={selectedContact} methodsState={methodsState}/>
        </>
      ) : (
        <>
          <h2 id='simple-modal-title'>Edit Contact methods</h2>
          <EditContactMethodForm
            selectedContact={selectedContact}
            edit={edit}
          />
        </>
      )}
    </>
  )
 

  return (
    <Card variant='outlined'>
      <Fab id='add' onClick={(e) => handleOpen(e, 'add')}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {methodLoading === true ? (
        <CircularProgress color='secondary' />
      ) : listMethods.length >= 1 ? (
        listMethods.map((itm: any, idx: any) => (
          <Accordion
            expanded={expanded === `panel${idx}`}
            onChange={handleChange(`panel${idx}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id='panel1bh-header'
            >
              <Avatar>
                <AssignmentIcon />
              </Avatar>

              <Typography variant='h6'>{itm.kind || err}</Typography>
              <Fab onClick={(e) => handleOpen(e, 'edit', itm)}>
                <EditIcon />
              </Fab>
            </AccordionSummary>
            <AccordionDetails>
              <List component='nav'>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary={itm.data} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary='Visibility' />
                  {itm.visibility}
                </ListItem>
                <ListItem button>
                  <ListItemIcon>Notes</ListItemIcon>
                  {itm.notes || 'No Notes Found'}
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <List subheader={<li />}>
          <ListItem key={`item-no-item`}>
            <ListItemText primary="" />
          </ListItem>
        </List>
      )}
    </Card>
  )
}
