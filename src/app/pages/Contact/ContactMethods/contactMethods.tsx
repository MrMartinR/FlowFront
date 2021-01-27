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
import DeleteIcon from '@material-ui/icons/Delete'
import AddContactMethodForm from './addContactMethodForm'
import EditContactMethodForm from './editContactMethodForm'
import DeleteContactMethod from './deleteContactMethod'

export const ContactMethod = (props: any) => {
  const { methodLoading, listMethods, selectedContact, methodsState } = props
  const err = 'Not Found'
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const [open, setOpen] = React.useState(false)
  const [add, setAdd] = React.useState('' as string)
  const [edit, setEdit] = React.useState(null)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const handleOpen = (e: any, value: any, itm = null) => {
    if (value === 'add') {
      setAdd('add')
    }
    if (value === 'edit') {
      setAdd('edit')
      setEdit(itm)
    }
    if (value === 'delete') {
      setAdd('delete')
      setEdit(itm)
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const body = (
    <>
      {add === 'add' ? (
        <>
          <Typography variant="h6" id="simple-modal-title">
            Add Contact method
          </Typography>

          <AddContactMethodForm selectedContact={selectedContact} methodsState={methodsState} />
        </>
      ) : add === 'edit' ? (
        <>
          <Typography variant="h6">Edit Contact method</Typography>
          <EditContactMethodForm selectedContact={selectedContact} edit={edit} methodsState={methodsState} />
        </>
      ) : (
        <>
          <Typography variant="h6">Delete Contact method</Typography>
          <DeleteContactMethod edit={edit} methodsState={methodsState} />
        </>
      )}
    </>
  )

  return (
    <Card variant="outlined">
      <AddIcon id="add" onClick={(e) => handleOpen(e, 'add')}></AddIcon>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {methodLoading === true ? (
        <CircularProgress color="secondary" />
      ) : listMethods.length >= 1 ? (
        listMethods.map((itm: any, idx: any) => (
          <Accordion expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} id="panel1bh-header">
              <Avatar>
                <AssignmentIcon />
              </Avatar>

              <Typography variant="h6">{itm.kind || err}</Typography>
              <EditIcon onClick={(e) => handleOpen(e, 'edit', itm)}> </EditIcon>
              <DeleteIcon onClick={(e) => handleOpen(e, 'delete', itm)} />
            </AccordionSummary>
            <AccordionDetails>
              <List component="nav">
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
                  <ListItemText primary="Visibility" />
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
