import React, { useState } from 'react'
import { useHistory } from 'react-router'
import {
  makeStyles,
  Grid,
  Toolbar,
  CardHeader,
  Dialog,
  Popover,
  DialogContent,
  Typography,
  Button,
} from '@material-ui/core'
import { VerticalLinearStepper } from './ContactStepper'
import IconUnlock from '../../../common/layout/components/icons/Unlock'
import IconLock from '../../../common/layout/components/icons/Lock'
import IconAdd from '../../../common/layout/components/icons/Add'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
  },
  cardHeaderAction: {
    margin: 'auto',
  },
})

/**
 * The contact top bar nav
 * holder the add contact componet
 */
export const ContactToolBar = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { selectedContact } = props
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openedPopoverId, setOpenedPopoverId] = useState(null)
  const linkTo = useHistory()
  // funcion que abre o dialog de engadir contact
  const handleOpen = (e: any, value: any, itm = null) => {
    setOpen(true)
  }
  // funcion para cambiar a view de originatorDetails
  const handleOriginator = () => {
    linkTo.push(`/originators/${selectedContact.relationships.originator.data.id}`)
  }
  // funcion para cambair a view de platformDetails
  const handlePlatform = () => {
    linkTo.push(`/platforms/${selectedContact.relationships.platform.data.id}`)
  }
  // funcion que pecha o dialog de engadir contact
  const handleClose = () => {
    setOpen(false)
  }
  // funcion que abre u popover coa información da visibility o pinchar no icono
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: any) => {
    setAnchorEl(e.currentTarget)
    setOpenedPopoverId(id)
  }
  // Función para pechar o popover
  const handleClosePopover = () => {
    setAnchorEl(null)
    setOpenedPopoverId(null)
  }
  const id = open ? 'simple-popover' : undefined
  // corpo do dialog de engadir contact
  const body = (
    <VerticalLinearStepper selectedContact={selectedContact} edit={false} handleClose={handleClose} />
  )
  return (
    <>
      <Toolbar variant="dense" className={classes.root}>
        <Grid item xs={12}>
          <CardHeader
            title="Contacts"
            subheader="Public and Private contacts"
            action={
              <>
                {selectedContact?.relationships?.platform.data !== null && (
                  <Button onClick={handlePlatform}>Platform</Button>
                )}
                {selectedContact?.relationships?.originator.data !== null && (
                  <Button onClick={handleOriginator}>Originator</Button>
                )}
                <Button onClick={(e) => handleOpen(e, 'add')}>
                  <IconAdd />
                </Button>
                <Button onClick={(e) => handleClick(e, 1)}>
                  {selectedContact?.attributes?.visibility === 'Public' ? <IconUnlock /> : <IconLock />}
                </Button>
                <Popover
                  id={id}
                  open={openedPopoverId === 1}
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
                  {selectedContact?.attributes?.visibility === 'Public' ? (
                    <Typography variant="body1">This contact is public</Typography>
                  ) : (
                    <Typography variant="body1">This contact is private, only you have access</Typography>
                  )}
                </Popover>
              </>
            }
            classes={{
              action: classes.cardHeaderAction,
            }}
          />
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </Toolbar>
    </>
  )
}
