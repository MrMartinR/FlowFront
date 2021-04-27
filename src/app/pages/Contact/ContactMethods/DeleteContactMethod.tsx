import React, { useEffect } from 'react'
import { DialogContent, DialogActions, DialogContentText, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as contactsActions from './../state/contactsActions'
export const DeleteContactMethod = (props: any) => {
  const { edit, setOpen } = props
  const [res, SetRes] = React.useState(false as boolean)
  const handleStatus = () => {
    SetRes(true)
  }
  let dispatch = useDispatch()
  useEffect(() => {
    (async function () {
      if (res === true) {
        await dispatch(contactsActions.deleteContactMethods(edit.id))
        setOpen(false);
      }
    })()
    // eslint-disable-next-line
  }, [dispatch, res])

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