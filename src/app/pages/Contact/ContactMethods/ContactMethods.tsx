import React, { useState } from 'react'
/* eslint-disable no-restricted-imports*/

import {
  Typography,
  Card,
  Grid,
  LinearProgress,
  Link,
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
  const { methodLoading, listMethods, selectedContact } = props
  const [open, setOpen] = useState(false)
  const [add, setAdd] = useState('' as string)
  const [edit, setEdit] = useState(null)
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

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

          <AddContactMethodForm selectedContact={selectedContact} setOpen={setOpen} />
        </>
      ) : add === 'edit' ? (
        <>
          <Typography variant="h6">Edit Contact Method</Typography>
          <EditContactMethodForm selectedContact={selectedContact} edit={edit} setOpen={setOpen} />
        </>
      ) : (
        <>
          <Typography variant="h6">Delete Contact Method</Typography>
          <DeleteContactMethod edit={edit} setOpen={setOpen} />
        </>
      )}
    </>
  )

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, popoverid:any) => {
    setAnchorEl(event.currentTarget);
    setOpenedPopoverId(popoverid);
  }

  // Popover
  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  }

  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <Card variant="outlined">
        <Grid container key = { 1 } direction="row">
          <Grid item xs={ 10 }> 
            <Typography paragraph = { true } variant="h6">Contact Methods</Typography>
          </Grid>
          <Grid item xs={ 2 }>
            <Button variant = 'contained' color = 'primary'>
              <AddIcon id="add" onClick={(e) => handleOpen(e, 'add')}></AddIcon>
            </Button>
          
          </Grid>
          
        </Grid> 
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
        ) : listMethods?.length >= 1 ? (
          listMethods.map((itm: any, idx: any) => (
            <Grid container key = { itm.id } direction="row">
              <Grid item xs={1}>
                {
                  (itm.kind==='Address' && <img height="20" src={'/media/svg/icons/address.svg'} alt="" />)
                  || (itm.kind==='Email' && <img height="20" src={'/media/svg/icons/email.svg'} alt="" />)
                  || (itm.kind==='Phone' && <img height="20" src={'/media/svg/icons/phone.svg'} alt="" />)
                  || (itm.kind==='Skype' && <img height="20" src={'/media/svg/icons/skype.svg'} alt="" />)
                  || (itm.kind==='Telegram' && <img height="20" src={'/media/svg/icons/telegram.svg'} alt="" />)
                  || (itm.kind==='Instagram' && <img height="20" src={'/media/svg/icons/instagram.svg'} alt="" />)
                  || (itm.kind==='FB Page' && <img height="20" src={'/media/svg/icons/facebook-page.svg'} alt="" />)
                  || (itm.kind==='FB Profile' && <img height="20" src={'/media/svg/icons/facebook-profile.svg'} alt="" />)
                  || (itm.kind==='FB Group' && <img height="20" src={'/media/svg/icons/facebook-group.svg'} alt="" />)
                  || (itm.kind==='LinkedIn' && <img height="20" src={'/media/svg/icons/linkedin.svg'} alt="" />)
                  || (itm.kind==='Twitter' && <img height="20" src={'/media/svg/icons/twitter.svg'} alt="" />)
                  || (itm.kind==='Vimeo' && <img height="20" src={'/media/svg/icons/vimeo.svg'} alt="" />)
                  || (itm.kind==='YouTube' && <img height="20" src={'/media/svg/icons/youtube.svg'} alt="" />)
                  || (itm.kind==='Web' && <img height="20" src={'/media/svg/icons/link-1.svg'} alt="" />)
                  || <img height="20" src={'/media/svg/icons/dashboard.svg'} alt="" />
                }
              </Grid>
              <Grid item xs={9}>
                {
                  ((itm.kind==='FB Page'
                  ||itm.kind==='Telegram'
                  ||itm.kind==='Instagram'
                  ||itm.kind==='FB Page'
                  ||itm.kind==='FB Profile'
                  ||itm.kind==='FB Group'
                  ||itm.kind==='LinkedIn'
                  ||itm.kind==='Twitter'
                  ||itm.kind==='YouTube'
                  ||itm.kind==='Vimeo'
                  ||itm.kind==='Web') && <Typography variant="body1"><Link href= { itm.data.trim() } color = 'inherit' target="_blank" rel="noreferrer">{itm.data}</Link></Typography>)
                  ||(itm.kind==='Phone' && <Typography variant="body1"><Link href= {`tel:${itm.data.trim()}`} color = 'inherit' target="_blank" rel="noreferrer">{itm.data}</Link></Typography>)
                  ||(itm.kind==='Email' && <Typography variant="body1"><Link href= {`mailto:${itm.data.trim()}`} color = 'inherit' target="_blank" rel="noreferrer">{itm.data}</Link></Typography>)
                  ||(itm.kind==='Skype' && <Typography variant="body1"><Link href= {`skype:${itm.data.trim()}?userinfo`} color = 'inherit' target="_blank" rel="noreferrer">{itm.data}</Link></Typography>)
                  ||(itm.kind==='Address' && <Typography variant="body1"><Link href= {`https://www.google.es/maps/place/${encodeURI(itm.data.trim())}`} rel="noreferrer" color = 'inherit' target="_blank">{itm.data}</Link></Typography>)
                  ||<Typography variant="body1">{itm.data}</Typography>
                } 


                
              </Grid>
              <Grid item xs={2}>
                <Button aria-describedby={id} variant="contained" color="primary" onClick={(e) => handleClick( e, itm.id )}>
                  •••
                </Button>
                <Popover
                  id={id}
                  open={ openedPopoverId === itm.id}
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
                  <Typography variant="body2"> { itm.notes? "Notes: "+(itm.notes):("") }</Typography>
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
