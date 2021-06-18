import { Button, Grid, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as userAccountsActions from './state/userAccountsActions'
export const DeleteUserAccount = (props: any) => {
    const { handleClose, singleAccount } = props
    const dispatch = useDispatch()
    const handleDelete = () => {
        dispatch(userAccountsActions.deleteUserAccount(singleAccount.id))
        handleClose()
      }
  return (
    <Grid container>
      <Typography variant="h4" paragraph>
        Delete Account
      </Typography>
      <Typography paragraph variant="body1">
        Are you sure you want to delete the account?
      </Typography>
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </Grid>
    </Grid>
  )
}
