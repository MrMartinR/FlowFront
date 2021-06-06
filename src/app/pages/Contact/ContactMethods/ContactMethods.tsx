import { useState } from 'react'
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
  DialogContent,
  Button,
  Avatar,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { AddContactMethodForm } from './AddContactMethodForm'
import { EditContactMethodForm } from './EditContactMethodForm'
import { DeleteContactMethod } from './DeleteContactMethod'

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
  // funcion que abre o dialog de add, edit ou delete method
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
  // funcion para pechar o dialog
  const handleClose = () => {
    setOpen(false)
  }
  // corpo do dialog de add, edit ou delete
  const body = (
    <>
      {add === 'add' ? (
        <>
          <Typography variant="h6">Add Contact Method</Typography>

          <AddContactMethodForm selectedContact={selectedContact} handleClose={handleClose} />
        </>
      ) : add === 'edit' ? (
        <>
          <Typography variant="h6">Edit Contact Method</Typography>
          <EditContactMethodForm
            selectedContact={selectedContact}
            edit={edit}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
        </>
      ) : (
        <>
          <Typography variant="h6">Delete Contact Method</Typography>
          <DeleteContactMethod edit={edit} handleClose={handleClose} />
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
        </Dialog>

        {methodLoading === true ? (
          <LinearProgress color="secondary" />
        ) : listMethods?.length >= 1 ? (
          listMethods.map((itm: any, idx: any) => (
            <CardActions key={itm.id}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  {(itm.kind === 'Address' && (
                    <Avatar variant="square" src={'/media/svg/icons/address.svg'} alt="Address" />
                  )) ||
                    (itm.kind === 'Email' && (
                      <Avatar variant="square" src={'/media/svg/icons/email.svg'} alt="Email" />
                    )) ||
                    (itm.kind === 'Phone' && (
                      <Avatar variant="square" src={'/media/svg/icons/phone.svg'} alt="Phone" />
                    )) ||
                    (itm.kind === 'Skype' && (
                      <Avatar variant="square" src={'/media/svg/icons/skype.svg'} alt="Skype" />
                    )) ||
                    (itm.kind === 'Telegram' && (
                      <Avatar variant="square" src={'/media/svg/icons/telegram.svg'} alt="Telegram" />
                    )) ||
                    (itm.kind === 'Instagram' && (
                      <Avatar variant="square" src={'/media/svg/icons/instagram.svg'} alt="Instagram" />
                    )) ||
                    (itm.kind === 'FB Page' && (
                      <Avatar variant="square" src={'/media/svg/icons/facebook-page.svg'} alt="FB Page" />
                    )) ||
                    (itm.kind === 'FB Profile' && (
                      <Avatar variant="square" src={'/media/svg/icons/facebook-profile.svg'} alt="FB Profile" />
                    )) ||
                    (itm.kind === 'FB Group' && (
                      <Avatar variant="square" src={'/media/svg/icons/facebook-group.svg'} alt="FB Group" />
                    )) ||
                    (itm.kind === 'LinkedIn' && (
                      <Avatar variant="square" src={'/media/svg/icons/linkedin.svg'} alt="LinkedIn" />
                    )) ||
                    (itm.kind === 'Twitter' && (
                      <Avatar variant="square" src={'/media/svg/icons/twitter.svg'} alt="Twitter" />
                    )) ||
                    (itm.kind === 'Vimeo' && (
                      <Avatar variant="square" src={'/media/svg/icons/vimeo.svg'} alt="Vimeo" />
                    )) ||
                    (itm.kind === 'YouTube' && (
                      <Avatar variant="square" src={'/media/svg/icons/youtube.svg'} alt="YouTube" />
                    )) ||
                    (itm.kind === 'Web' && (
                      <Avatar variant="square" src={'/media/svg/icons/link-1.svg'} alt="Web" />
                    )) || <Avatar variant="square" src={'/media/svg/icons/dashboard.svg'} alt="Other" />}
                </Grid>
                <Grid item xs={8}>
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
                <Grid item xs={2}>
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
