import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControl,
  FormLabel,
  FormHelperText,
  OutlinedInput,
  Button,
  Typography,
} from '@material-ui/core'
import * as Yup from 'yup'
import * as userSettingsActions from './state/userSettingsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useForm } from 'react-hook-form'
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
  /*
   * schema for yup validation
   */
  const SettingsSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(SettingsSchema),
  })
  const [profile, setProfile] = useState({} as any)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  // contact Redux state
  const dispatch = useDispatch()

  const GetUserProfile = () => {
    useEffect(() => {
      if (dispatch) {
        dispatch(userSettingsActions.fetchUserProfile())
      }
    }, [])
  }
  GetUserProfile()

  useEffect(() => {
    if (userSettingsState.userProfile) {
      setProfile(userSettingsState.userProfile)
    }
  }, [userSettingsState.userProfile])
  useEffect(() => {
    if (profile.attributes) {
      setEmail(profile.attributes.email)
      setUsername(profile.attributes.username)
    }
  }, [profile])
  const onSubmit = ({ email, username, password }: SettingsType) => {
    dispatch(userSettingsActions.updateProfile(username, email, password))
  }
  return (
    <Card className={classes.root}>
      <CardHeader title="Settings" subheader="Update your account and settings" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* begin: Username */}
          {username!==''&&<FormControl size="small" fullWidth required>
            <FormLabel>Username</FormLabel>
            <OutlinedInput
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              defaultValue={profile.attributes?.username}
              inputRef={register()}
            />
            <FormHelperText>Minimum 3 characteres</FormHelperText>
            <Typography variant="caption"> {errors.username && errors.username.message}</Typography>
          </FormControl>}
          {/* end: Username */}

          {/* email */}
          {email!==''&&<FormControl size="small" fullWidth required>
            <FormLabel>Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              defaultValue={email}
              inputRef={register()}
            />
            <FormHelperText>Email will not be publicly displayed</FormHelperText>
            <Typography variant="caption"> {errors.email && errors.email.message}</Typography>
          </FormControl>}

          {/* password */}
          <FormControl size="small" fullWidth required>
            <FormLabel>Password</FormLabel>
            <OutlinedInput id="password" name="password" type="password" autoComplete="off" inputRef={register()} />
            <FormHelperText>Minimum 3 characteres</FormHelperText>
            <Typography variant="caption"> {errors.password && errors.password.message}</Typography>
          </FormControl>
          <CardActions>
            <Button type="submit">Save</Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
