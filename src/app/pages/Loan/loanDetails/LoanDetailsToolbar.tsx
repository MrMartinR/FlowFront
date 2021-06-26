import {
  Grid,
  Button,
  ButtonBase,
  Typography,
  Toolbar,
  Avatar,
  makeStyles,
  Container,
  Dialog,
  DialogContent,
} from '@material-ui/core/'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import IconOpenNewWindow from '../../../../common/layout/components/icons/OpenNewWindow'
import IconOption from '../../../../common/layout/components/icons/Option'
import * as loansActions from './../state/loansActions'
import { LoanEdit } from './LoanEdit'
/* styles */
const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 0,
  },
  cardHeaderAction: {
    margin: 'auto' /* adds margin on top of the elements */,
  },
})

export const LoanDetailsToolbar = (props: any) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const { loanDetails } = props
  const linkTo = useHistory()
  /* handle the navigation for the platform buton/icon loading the platform details */
  const handlePlatform = (e: any) => {
    linkTo.push(`/platforms/${loanDetails.attributes?.platform.id}`)
  }
  /* handle the navigation for the originator buton/icon loading the originator details */
  const handleOriginator = (e: any) => {
    linkTo.push(`/originators/${loanDetails.attributes?.originator.id}`)
  }
  /* handle the edit/delete opening dialog
   * @Params ['edit', 'delete']
   */

  const handleOpen = (e: any, value: any) => {
    if (value === 'edit') setEdit(true)
    if (value === 'delete') setEdit(false)
    setOpen(true)
  }
  /* handle the edit/delete closing dialog */
  const handleClose = () => {
    setOpen(false)
  }
  // funcion que chama a accion de borrar o contact seleccionado
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(loansActions.deleteLoan(loanDetails.id))
    handleClose()
    linkTo.push(`/loans`)
  }
  // corpo do dialog de edit ou delete
  const body =
    edit === true ? (
      <LoanEdit loanDetails={loanDetails} handleClose={handleClose} handleOpen={handleOpen} />
    ) : (
      <>
        <Typography variant="h4" paragraph>
          Delete Loan
        </Typography>
        <Typography paragraph variant="body1">
          Are you sure you want to delete the loan?
        </Typography>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </Grid>
      </>
    )
  return (
    <Container>
      {/* edit contact dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>{body}</DialogContent>
      </Dialog>
      <Toolbar variant="dense" className={classes.root}>
        {/* <Grid container> */}
        <Grid container>
          {/* block 1 */}
          <Grid item xs={8} container alignItems="center" spacing={1} className={classes.root}>
            <Grid item>
              <Avatar
                component={ButtonBase}
                onClick={handlePlatform}
                src={'/media/svg/contact/icons/' + loanDetails.attributes?.platform_contact_id + '.svg'}
                alt={loanDetails.attributes?.platform.trade_name}
                variant="square"
              ></Avatar>
            </Grid>
            <Grid item>
              <Avatar
                component={ButtonBase}
                onClick={handleOriginator}
                src={'/media/svg/contact/icons/' + loanDetails.attributes?.originator_contact_id + '.svg'}
                alt={loanDetails.attributes?.originator_trade_name}
                variant="square"
              ></Avatar>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">{loanDetails.attributes?.name}</Typography>
              <Typography variant="caption">{loanDetails.attributes?.code}</Typography>
            </Grid>
          </Grid>

          {/* block 2 */}
          <Grid item xs={2} container alignItems="center" justify="space-around" className={classes.root}>
            <Grid>
              <Typography>{loanDetails.attributes?.rating}</Typography>
            </Grid>
            <Grid>
              <Avatar
                variant="square"
                src={'/media/svg/flags/' + loanDetails.attributes?.country_iso_code + '.svg'}
                alt={loanDetails.attributes?.country_name}
              />
            </Grid>
            <Grid>
              <Typography>{loanDetails.attributes?.currency_code}</Typography>
            </Grid>
            <Grid>
              <Typography>{loanDetails.attributes?.status}</Typography>
            </Grid>
          </Grid>

          {/* block 3 */}
          <Grid container item xs={2} justify="space-around" className={classes.root}>
            <Button href={loanDetails.attributes?.link} target="_blank">
              <IconOpenNewWindow />
            </Button>
            {/* // Only visible to Admin/Contributors */}
            <Button onClick={(e) => handleOpen(e, 'edit')} color="primary">
              <IconOption />
            </Button>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Toolbar>
    </Container>
  )
}
