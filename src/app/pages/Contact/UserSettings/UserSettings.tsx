import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  makeStyles,
  Card,
  CardHeader,
  FormLabel,
  FormHelperText,
  OutlinedInput,
  Button,
  Grid,
  CardContent,
  CardActions,
} from '@material-ui/core'
import * as userSettingsActions from './state/userSettingsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useForm } from 'react-hook-form'
import { UserAlert } from '../../../utils/UserAlert'
import { Alert } from '@material-ui/lab'

/* styles */
const useStyles = makeStyles({
  root: {
    margin: 24,
  },
})
/* types */
type SettingsType = {
  email: string
  username: string
  password: string
  name: string
}

export const UserSettings = () => {
  /* styles */
  const classes = useStyles()

  const { userSettingsState } = useSelector(
    (state: RootState) => ({
      userSettingsState: state.userSettings,
    }),
    shallowEqual
  )
  const { register, handleSubmit, errors } = useForm()
  const [profile, setProfile] = useState({} as any)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  // contact Redux state
  const dispatch = useDispatch()
  // petición do profile do user
  useEffect(() => {
    dispatch(userSettingsActions.fetchUserProfile())
  }, [dispatch])
  // Recibido o profile carga os datos do state
  useEffect(() => {
    if (userSettingsState.userProfile) {
      setProfile(userSettingsState.userProfile)
    }
  }, [userSettingsState.userProfile])
  // Unha vez cargados os datos meteos nas variables para uqe os mostre no form
  useEffect(() => {
    if (profile.attributes) {
      setEmail(profile.attributes.email)
      setUsername(profile.attributes.username)
    }
  }, [profile])
  // onSubmit envía o formulario
  const onSubmit = ({ email, username, password }: SettingsType) => {
    dispatch(userSettingsActions.updateProfile(username, email, password))
  }
  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(userSettingsActions.resetSuccess())
  }
  return (
    <>
    <Card className={classes.root}>
      <CardHeader title="Settings" subheader="Update your account and settings" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column">
            {/* begin: Username */}
            {username !== '' && (
              <>
                <FormLabel>Username</FormLabel>
                <OutlinedInput
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="off"
                  defaultValue={username}
                  inputRef={register({ required: true, minLength: 3 })}
                />
                <FormHelperText>Minimum 3 characteres</FormHelperText>
                {errors.username && errors.username.type === 'required' && (
                  <Alert severity="error">Username is required</Alert>
                )}
                {errors.username && errors.username.type === 'minLength' && (
                  <Alert severity="error">Username should be at-least 3 characters.</Alert>
                )}
              </>
            )}
            {/* end: Username */}

            {/* email */}
            {email !== '' && (
              <>
                <FormLabel>Email</FormLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  defaultValue={email}
                  inputRef={register({ required: true, pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                  }})}
                />
                <FormHelperText>Email will not be publicly displayed</FormHelperText>
                {errors.email && errors.email.type === 'required' && (
                  <Alert severity="error">Email is required</Alert>
                )}
                {errors.email && errors.email.type === 'pattern' && (
                  <Alert severity="error">{errors.email.message}</Alert>
                )}
              </>
            )}

            {/* password */}
            <>
              <FormLabel>Password</FormLabel>
              <OutlinedInput
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                inputRef={register({ required: true, minLength: 3 })}
              />
              <FormHelperText>Minimum 3 characteres</FormHelperText>
              {errors.password && errors.password.type === 'required' && (
                <Alert severity="error">Password is required</Alert>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <Alert severity="error">Password should be at-least 3 characters.</Alert>
              )}
            </>
            <CardActions>
              <Button type="submit" variant='contained'>Save</Button>
            </CardActions>
          </Grid>
        </form>
      </CardContent>
      <UserAlert
        resetSuccess={resetSuccess}
        success={userSettingsState.success}
        message={userSettingsState.message}
        error={userSettingsState.error}
      />
    </Card>
    </>
  )
}
