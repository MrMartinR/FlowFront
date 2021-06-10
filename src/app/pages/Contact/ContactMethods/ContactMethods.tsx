import { useEffect, useState } from 'react'
import {
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardActions,
  Grid,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  Dialog,
  DialogContent,
  Button,
  Avatar,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { AddContactMethodForm } from './AddContactMethodForm'
import { EditContactMethodForm } from './EditContactMethodForm'
import { DeleteContactMethod } from './DeleteContactMethod'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'

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
  const [list, setList] = useState(null as any)
  const [canEdit, setCanEdit] = useState(false)
  const { authState } = useSelector(
    (state: RootState) => ({
      authState: state.auth,
    }),
    shallowEqual
  )
  /* function open the dialog window */
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
  // funcion para ordear o array de methods
  const sort = (list: any) => {
    // array temporal para ordear alfabeticamente
    const mapped = list.map((el: any, i: any) => {
      return { index: i, value: el.kind.toLowerCase() }
    })
    // ordeando o array mapeado
    mapped.sort((a: any, b: any) => {
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    // contenedor para o array ordeado
    const result = mapped.map((el: any) => {
      return list[el.index]
    })
    // devolvese o array ordeado
    return result
  }

  useEffect(() => {
    if (listMethods?.length >0) {
      setList(sort(listMethods))
    } else setList(listMethods)
  }, [listMethods])

  /* function close dialog window */
  const handleClose = () => {
    setOpen(false)
  }
  // funcion que garda un boolean que indica se o user actual pode engadir, editar ou borrar methods no contact actual
  useEffect(() => {
    if (selectedContact.attributes?.visibility === 'Public') {
      if (authState.role !== 'user') {
        setCanEdit(true)
      } else setCanEdit(false)
    } else {
      if (selectedContact.attributes?.user?.id === authState.user?.id) {
        setCanEdit(true)
      } else setCanEdit(false)
    }
  }, [selectedContact, authState])
  /* add, edit, delete content */
  const body = (
    <>
      {add === 'add' ? (
        <AddContactMethodForm selectedContact={selectedContact} handleClose={handleClose} />
      ) : add === 'edit' ? (
        <EditContactMethodForm edit={edit} handleClose={handleClose} handleOpen={handleOpen} />
      ) : (
        <DeleteContactMethod edit={edit} handleClose={handleClose} />
      )}
    </>
  )

  return (
    <>
      <Card className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <CardHeader
              title="Contact Methods"
              action={
                canEdit && (
                  <Button>
                    <AddIcon id="add" onClick={(e) => handleOpen(e, 'add')} />
                  </Button>
                )
              }
            />
          </Grid>
        </Grid>

        {/* invoke the add edit delete window */}
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>

        {/* shows a progress bar on loading, a dummy row or the list of contacts methods */}
        {methodLoading === true ? (
          <LinearProgress />
        ) : list?.length >= 1 ? (
          list?.map((itm: any) => (
            <CardActions key={itm.id}>
              <Grid container alignItems="center">
                {/* renders the icon and data */}
                <Grid item xs={11}>
                  <ListItem
                    button
                    component="a"
                    href={
                      ((itm.kind === 'FB Page' ||
                        itm.kind === 'Telegram' ||
                        itm.kind === 'Instagram' ||
                        itm.kind === 'FB Profile' ||
                        itm.kind === 'FB Group' ||
                        itm.kind === 'LinkedIn' ||
                        itm.kind === 'Twitter' ||
                        itm.kind === 'YouTube' ||
                        itm.kind === 'Vimeo' ||
                        itm.kind === 'Web') &&
                        itm.data.trim()) ||
                      (itm.kind === 'Phone' && `tel:${itm.data.trim()}`) ||
                      (itm.kind === 'Email' && `mailto:${itm.data.trim()}`) ||
                      (itm.kind === 'Skype' && `skype:${itm.data.trim()}?userinfo`) ||
                      (itm.kind === 'Address' && `https://www.google.com/maps/place/${encodeURI(itm.data.trim())}`) ||
                      itm.data
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={'/media/svg/icons/' + itm.kind + '.svg'}
                        alt={itm.data}
                        variant="square"
                        className={classes.avatar}
                      />
                    </ListItemAvatar>
                    <Typography noWrap variant="body1">
                      {itm.data}
                    </Typography>
                  </ListItem>
                </Grid>
                {/* the options button */}
                {canEdit && (
                  <Grid item xs={1}>
                    <Button onClick={(e) => handleOpen(e, 'edit', itm)}>•••</Button>
                  </Grid>
                )}
              </Grid>
            </CardActions>
          ))
        ) : (
          /* dummy row */
          <Typography />
        )}
      </Card>
    </>
  )
}
