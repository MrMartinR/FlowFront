import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useDispatch } from 'react-redux'
import store from '../../../redux/store'
import * as userOriginatorsActions from './state/userOriginatorsActions'

export const UserOriginatorsAlert = ( props:any ) => {
    const {
        userOriginators: { error, success }
      } = store.getState()
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch( userOriginatorsActions.resetSuccessUserOriginators());
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
                    'Data saved'
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
