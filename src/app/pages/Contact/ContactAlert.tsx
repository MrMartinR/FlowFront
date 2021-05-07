import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import store from '../../../redux/store'
import * as contactsActions from './state/contactsActions'

export const ContactAlert = ( props:any ) => {
    const {
        contacts: { error, success, response }
      } = store.getState()
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch( contactsActions.resetSuccessContact());
      }
    return (
        <>
            {success === true ? (
          <Snackbar open={ true } autoHideDuration={3000} onClose={handleClick}>
            <Alert
              severity="success"
              onClose={ handleClick }
            >
                <AlertTitle>Success</AlertTitle>
                {
                    (response)
                    ?response
                    :'Data saved'
                }
            </Alert>
          </Snackbar>
        ) : success === false ? (
          <Snackbar open={ true} autoHideDuration={6000} onClose={handleClick}>
            <Alert
              severity="error"
              onClose={ handleClick }
            >
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          </Snackbar>
        ) : (
          <></>
        )}
        </>
    )
}
