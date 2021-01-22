import React from 'react'
import { DialogContent,DialogActions,DialogContentText, Button} from '@material-ui/core'


export const DeleteContactMethod = (props: any) => {
  const { edit } = props
  const [open, setOpen] = React.useState(false);
  const [res, SetRes] = React.useState(false);

  const handleStatus = () => {
    setOpen(true);
  };
  console.log(edit)

  return (
    <>
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