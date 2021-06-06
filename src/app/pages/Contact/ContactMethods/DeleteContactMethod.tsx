import { DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as contactsActions from './../state/contactsActions'
export const DeleteContactMethod = (props: any) => {
  const { edit, handleClose } = props
  let dispatch = useDispatch()
  // funcion que chama a action deleteContactMethods
  const handleStatus = () => {
    dispatch(contactsActions.deleteContactMethods(edit.id))
    handleClose()
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this contact method?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleStatus} variant="contained" color="secondary">
          Yes
        </Button>
      </DialogActions>
    </>
  )
}
