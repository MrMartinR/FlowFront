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
    margin: 8,
    padding: 12,
  },
  avatar: {
    height: '2vh',
    width: '2vh',
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
          {/* <Typography variant="h6">Edit Contact Method</Typography> */}
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
          listMethods.map((
            itm: any,
            idx: any // @rev: que pinta este idx ??
          ) => (
            <CardActions key={itm.id}>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  {(itm.kind === 'Address' && (
                    <Avatar
                      src={'/media/svg/icons/address.svg'}
                      alt="Address"
                      variant="square"
                      className={classes.avatar}
                    />
                  )) ||
                    (itm.kind === 'Email' && (
                      <Avatar
                        src={'/media/svg/icons/email.svg'}
                        alt="Email"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Phone' && (
                      <Avatar
                        src={'/media/svg/icons/phone.svg'}
                        alt="Phone"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Skype' && (
                      <Avatar
                        src={'/media/svg/icons/skype.svg'}
                        alt="Skype"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Telegram' && (
                      <Avatar
                        src={'/media/svg/icons/telegram.svg'}
                        alt="Telegram"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Instagram' && (
                      <Avatar
                        src={'/media/svg/icons/instagram.svg'}
                        alt="Instagram"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'FB Page' && (
                      <Avatar
                        src={'/media/svg/icons/facebook-page.svg'}
                        alt="FB Page"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'FB Profile' && (
                      <Avatar
                        src={'/media/svg/icons/facebook-profile.svg'}
                        alt="FB Profile"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'FB Group' && (
                      <Avatar
                        src={'/media/svg/icons/facebook-group.svg'}
                        alt="FB Group"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'LinkedIn' && (
                      <Avatar
                        src={'/media/svg/icons/linkedin.svg'}
                        alt="LinkedIn"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Twitter' && (
                      <Avatar
                        src={'/media/svg/icons/twitter.svg'}
                        alt="Twitter"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Vimeo' && (
                      <Avatar
                        src={'/media/svg/icons/vimeo.svg'}
                        alt="Vimeo"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'YouTube' && (
                      <Avatar
                        src={'/media/svg/icons/youtube.svg'}
                        alt="YouTube"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) ||
                    (itm.kind === 'Web' && (
                      <Avatar
                        src={'/media/svg/icons/link-1.svg'}
                        alt="Web"
                        variant="square"
                        className={classes.avatar}
                      />
                    )) || (
                      <Avatar
                        src={'/media/svg/icons/dashboard.svg'}
                        alt="Other"
                        variant="square"
                        className={classes.avatar}
                      />
                    )}
                </Grid>
                <Grid item xs={10}>
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
                          href={`https://www.google.com/maps/place/${encodeURI(itm.data.trim())}`}
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
