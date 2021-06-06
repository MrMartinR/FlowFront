import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export const UserAlert = ( props:any ) => {
    const { resetSuccess, success, error, message='Data Saved' } = props
    const handleClick = () => {
        resetSuccess()
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
                {message}
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
