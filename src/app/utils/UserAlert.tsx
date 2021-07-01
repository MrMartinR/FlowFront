import { Snackbar } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import { useEffect, useState } from 'react'

/* Notistack for advanced cases
 * See {@link https://github.com/iamhosseindhv/notistack/}
 */

export const UserAlert = (props: any) => {
  const { resetSuccess, success, error, message = 'Data Saved' } = props
  const [duration, setDuration] = useState(0)
  const [errorDuration, setErrorDuration] = useState(0)
  useEffect(() => {
    if (message) {
      const time = message.length * 100
      if (time < 2000) {
        setDuration(2000)
      } else if (time<7000) {
        setDuration(time)
      } else setDuration(7000)
    }
  }, [message])
  useEffect(() => {
    if (error) {
      const time = error.length * 100
      if (time < 2000) {
        setErrorDuration(2000)
      } else if (time<7000) {
        setErrorDuration(time)
      } else setErrorDuration(7000)
    }
  }, [error])
  const handleClick = () => {
    resetSuccess()
  }
  return (
    <>
      {success === true ? (
        <Snackbar open={true} autoHideDuration={duration} onClose={handleClick}>
          <Alert severity="success" onClose={handleClick}>
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        </Snackbar>
      ) : success === false ? (
        <Snackbar open={true} autoHideDuration={errorDuration} onClose={handleClick}>
          <Alert severity="error" onClose={handleClick}>
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
