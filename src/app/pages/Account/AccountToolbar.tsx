import { Toolbar, Button, Grid, makeStyles, CardHeader, Typography, Dialog, DialogContent } from '@material-ui/core'
import { useState } from 'react'
import { AccountAdd } from './AccountAdd'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
  },
  cardHeaderAction: {
    margin: 'auto',
  },
})
export const AccountToolBar = (props: any) => {
  /* styles */
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  // funcion que abre o dialog
  const handleOpen = () => {
    setOpen(true)
  }
  // función para pechar o dialog
  const handleClose = () => {
    setOpen(false)
  }
  // corpo do dialog de engadir account
  const body = (
    <>
      <Typography variant="h4">Add Account</Typography>
      <AccountAdd handleClose={handleClose} />
    </>
  )
  return (
    <>
      <>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>{body}</DialogContent>
        </Dialog>
      </>
      <Toolbar variant="dense" className={classes.root}>
        <Grid item xs={12}>
          <CardHeader
            title="Accounts"
            action={
              <Button variant="outlined" onClick={handleOpen}>
                +
              </Button>
            }
            classes={{
              action: classes.cardHeaderAction,
            }}
          />
        </Grid>
      </Toolbar>
    </>
  )
}
