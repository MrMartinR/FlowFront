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
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
  const [profile, setProfile] = useState({} as any)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const UserSettingsSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .min(3, 'Email should be at-least 3 characters.')
      .email('Entered value does not match email format'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username should be at-least 3 characters.')
      .max(50, 'Username should be less than 50 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(3, 'Password should be at-least 3 characters.')
      .max(50, 'Password should be less than 50 characters'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(UserSettingsSchema),
  })
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
                    name="username"
                    type="text"
                    autoComplete="off"
                    defaultValue={username}
                    inputRef={register()}
                  />
                  <FormHelperText>Minimum 3 characteres</FormHelperText>
                  {errors.username && <Alert severity="error">{errors.username.message}</Alert>}
                </>
              )}
              {/* end: Username */}

              {/* email */}
              {email !== '' && (
                <>
                  <FormLabel>Email</FormLabel>
                  <OutlinedInput
                    name="email"
                    type="email"
                    autoComplete="off"
                    defaultValue={email}
                    inputRef={register()}
                  />
                  <FormHelperText>Email will not be publicly displayed</FormHelperText>
                  {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
                </>
              )}

              {/* password */}
              <>
                <FormLabel>Password</FormLabel>
                <OutlinedInput name="password" type="password" autoComplete="off" inputRef={register()} />
                <FormHelperText>Minimum 3 characteres</FormHelperText>
                {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
              </>
              <CardActions>
                <Button type="submit" color="primary">
                  Save
                </Button>
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
