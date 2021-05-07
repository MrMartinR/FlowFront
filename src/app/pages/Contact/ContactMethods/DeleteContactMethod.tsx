import { DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as contactsActions from './../state/contactsActions'
export const DeleteContactMethod = (props: any) => {
  const { edit, setOpen } = props
  let dispatch = useDispatch()
  const handleStatus = () => {
    dispatch(contactsActions.deleteContactMethods(edit.id))
    setOpen(false);
  }
  
  return (
    <>
      
      <DialogContent>
        <DialogContentText>Are you sure you want to delete the contact methods?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStatus} variant = 'contained' color="secondary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </>
  )
}
export default DeleteContactMethod