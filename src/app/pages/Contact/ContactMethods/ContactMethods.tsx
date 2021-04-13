import React from 'react'
/* eslint-disable no-restricted-imports*/

import {
  Typography,
  Card,
  Grid,
  LinearProgress,
  List,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import AddContactMethodForm from './AddContactMethodForm'
import EditContactMethodForm from './EditContactMethodForm'
import DeleteContactMethod from './DeleteContactMethod'

export const ContactMethod = (props: any) => {
  const { methodLoading, listMethods, selectedContact, methodsState } = props
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
            Add Contact Method
          </Typography>

          <AddContactMethodForm selectedContact={selectedContact} methodsState={methodsState} />
        </>
      ) : add === 'edit' ? (
        <>
          <Typography variant="h6">Edit Contact Method</Typography>
          <EditContactMethodForm selectedContact={selectedContact} edit={edit} methodsState={methodsState} />
        </>
      ) : (
        <>
          <Typography variant="h6">Delete Contact Method</Typography>
          <DeleteContactMethod edit={edit} methodsState={methodsState} />
        </>
      )}
    </>
  )

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // Popover
  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const openPopover = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
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
          <LinearProgress color="secondary" />
        ) : listMethods.length >= 1 ? (
          listMethods.map((itm: any, idx: any) => (
            <Grid container key = { itm.id } direction="row">
              <Grid item xs={1}>
                <img height="20" src={'/media/svg/icons/dashboard.svg'} alt="" />
              </Grid>
              <Grid item xs={10}>
                <Typography paragraph={ true } variant="h6">{itm.kind}</Typography>
                <Typography variant="body2"><img height="20" width="50" src={'/media/svg/icons/currency.svg'} alt="" /> {itm.data}</Typography>
                <Typography paragraph={ true } variant="body2"><img height="20" width="50" src={'/media/svg/icons/currency.svg'} alt="" /> Visibility: {itm.visibility}</Typography>
                <Typography paragraph={ true } variant="body2">Notes: { itm.notes? (itm.notes):("No notes found") }</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained" color="primary" onClick={handleClick}>
                  •••
                </Button>
                <Popover
                  id={id}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handleClosePopover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <Button onClick={(e) => handleOpen(e, 'edit', itm)}> Edit </Button>
                  <Button color="secondary" onClick={(e) => handleOpen(e, 'delete', itm)}>
                    Delete
                  </Button>
                </Popover>
              </Grid>
            </Grid>
          ))
        ) : (
          <List subheader={<li />}></List>
        )}
      </Card>
    </>
  )
}
