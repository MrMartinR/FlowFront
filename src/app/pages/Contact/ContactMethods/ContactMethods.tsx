import { useState } from 'react'
/* eslint-disable no-restricted-imports*/

import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardActions,
  Grid,
  LinearProgress,
  Link,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import AddContactMethodForm from './AddContactMethodForm'
import EditContactMethodForm from './EditContactMethodForm'
import DeleteContactMethod from './DeleteContactMethod'

/* styles */
const useStyles = makeStyles({
  root: {
    margin: 24,
  },
})

export const ContactMethod = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { methodLoading, listMethods, selectedContact } = props
  const [open, setOpen] = useState(false)
  const [add, setAdd] = useState('' as string)
  const [edit, setEdit] = useState(null)

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
          {/* [ToDo] Move this button inside the EditContactMethodForm */}
          <Button color="secondary" onClick={(e) => handleOpen(e, 'delete', edit)}>
            Delete
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h6">Delete Contact Method</Typography>
          <DeleteContactMethod edit={edit} setOpen={setOpen} />
        </>
      )}
    </>
  )

  return (
    <>
      <Card className={classes.root}>
        <Grid container key={1} direction="row">
          <Grid item xs={12}>
            <CardHeader
              title="Contact Methods"
              action={
                <Button>
                  <AddIcon id="add" onClick={(e) => handleOpen(e, 'add')} />
                </Button>
              }
            />
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} variant="contained">
              Cancel
            </Button> */}
          </DialogActions>
        </Dialog>

        {methodLoading === true ? (
          <LinearProgress color="secondary" />
        ) : listMethods?.length >= 1 ? (
          listMethods.map((itm: any, idx: any) => (
            <CardActions>
              <Grid container key={itm.id} direction="row">
                <Grid item xs={1}>
                  {(itm.kind === 'Address' && <img height="20" src={'/media/svg/icons/address.svg'} />) ||
                    (itm.kind === 'Email' && <img height="20" src={'/media/svg/icons/email.svg'} />) ||
                    (itm.kind === 'Phone' && <img height="20" src={'/media/svg/icons/phone.svg'} />) ||
                    (itm.kind === 'Skype' && <img height="20" src={'/media/svg/icons/skype.svg'} />) ||
                    (itm.kind === 'Telegram' && <img height="20" src={'/media/svg/icons/telegram.svg'} />) ||
                    (itm.kind === 'Instagram' && <img height="20" src={'/media/svg/icons/instagram.svg'} />) ||
                    (itm.kind === 'FB Page' && <img height="20" src={'/media/svg/icons/facebook-page.svg'} />) ||
                    (itm.kind === 'FB Profile' && <img height="20" src={'/media/svg/icons/facebook-profile.svg'} />) ||
                    (itm.kind === 'FB Group' && <img height="20" src={'/media/svg/icons/facebook-group.svg'} />) ||
                    (itm.kind === 'LinkedIn' && <img height="20" src={'/media/svg/icons/linkedin.svg'} />) ||
                    (itm.kind === 'Twitter' && <img height="20" src={'/media/svg/icons/twitter.svg'} />) ||
                    (itm.kind === 'Vimeo' && <img height="20" src={'/media/svg/icons/vimeo.svg'} />) ||
                    (itm.kind === 'YouTube' && <img height="20" src={'/media/svg/icons/youtube.svg'} />) ||
                    (itm.kind === 'Web' && <img height="20" src={'/media/svg/icons/link-1.svg'} />) || (
                      <img height="20" src={'/media/svg/icons/dashboard.svg'} />
                    )}
                </Grid>
                <Grid item xs={9}>
                  {((itm.kind === 'FB Page' ||
                    itm.kind === 'Telegram' ||
                    itm.kind === 'Instagram' ||
                    itm.kind === 'FB Page' ||
                    itm.kind === 'FB Profile' ||
                    itm.kind === 'FB Group' ||
                    itm.kind === 'LinkedIn' ||
                    itm.kind === 'Twitter' ||
                    itm.kind === 'YouTube' ||
                    itm.kind === 'Vimeo' ||
                    itm.kind === 'Web') && (
                    <Typography noWrap variant="body1">
                      <Link href={itm.data.trim()} color="inherit" target="_blank">
                        {itm.data}
                      </Link>
                    </Typography>
                  )) ||
                    (itm.kind === 'Phone' && (
                      <Typography noWrap variant="body1">
                        <Link href={`tel:${itm.data.trim()}`} color="inherit" target="_blank">
                          {itm.data}
                        </Link>
                      </Typography>
                    )) ||
                    (itm.kind === 'Email' && (
                      <Typography noWrap variant="body1">
                        <Link href={`mailto:${itm.data.trim()}`} color="inherit" target="_blank">
                          {itm.data}
                        </Link>
                      </Typography>
                    )) ||
                    (itm.kind === 'Skype' && (
                      <Typography noWrap variant="body1">
                        <Link href={`skype:${itm.data.trim()}?userinfo`} color="inherit" target="_blank">
                          {itm.data}
                        </Link>
                      </Typography>
                    )) ||
                    (itm.kind === 'Address' && (
                      <Typography noWrap variant="body1">
                        <Link
                          href={`https://www.google.es/maps/place/${encodeURI(itm.data.trim())}`}
                          color="inherit"
                          target="_blank"
                        >
                          {itm.data}
                        </Link>
                      </Typography>
                    )) || (
                      <Typography noWrap variant="body1">
                        {itm.data}
                      </Typography>
                    )}
                </Grid>
                <Grid item xs={1}>
                  <Button onClick={(e) => handleOpen(e, 'edit', itm)}>•••</Button>
                </Grid>
              </Grid>
            </CardActions>
          ))
        ) : (
          <List subheader={<li />}></List>
        )}
      </Card>
    </>
  )
}
