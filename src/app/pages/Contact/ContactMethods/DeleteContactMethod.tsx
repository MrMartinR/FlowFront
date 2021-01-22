import React, { useEffect }  from 'react'
import { DialogContent,DialogActions,DialogContentText, Button, Collapse, IconButton} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as contactMethodsActions from './state/contactMethodsActions'
import {Alert, AlertTitle} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
export const DeleteContactMethod = (props: any) => {
  const { edit, methodsState } = props
  const [res, SetRes] = React.useState(false as boolean);
  const [open, setOpen] = React.useState(true as boolean);
  const [response, setResponse] = React.useState(null as any)
  const handleStatus = () => {
    SetRes(true);
  };
  let dispatch = useDispatch()
  useEffect(() => {
    if(res === true){
      dispatch(contactMethodsActions.deleteContactMethods(edit.id))
      setResponse(methodsState.contactMethodsTable.success)
    }
  }, [res])


  return (
    <>
     {response === true ?
    <Collapse in={open}>
    <Alert
    severity="success"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle>Success</AlertTitle>
      {methodsState.deleteResponse}
    </Alert>
  </Collapse>
  :response === false ?
  <Collapse in={open}>
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {methodsState.deleteResponse}
        </Alert>
      </Collapse>
      :
      <></>
    }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to 
            <br></br>
            delete the contact methods?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStatus} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
    </>
  );
}
export default DeleteContactMethod