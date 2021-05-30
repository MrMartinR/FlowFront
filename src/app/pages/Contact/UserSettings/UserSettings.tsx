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
} from '@material-ui/core'

import * as userSettingsActions from './state/userSettingsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useForm } from 'react-hook-form'

/* styles */
const useStyles = makeStyles({
  root: {
    margin: 24,
  },
})

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
  const onSubmit = (data: any, e: any) => {
    const formData = new FormData()
    formData.append('user[username]', data.username)
    formData.append('user[email]', data.email)
    formData.append('user[password]', data.password)
    dispatch(userSettingsActions.updateProfile(formData))
  }
  console.log(profile.attributes?.username)
  return (
    <Card className={classes.root}>
      <CardHeader title="Settings" subheader="Update your account and settings" />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* begin: Username */}
          <FormControl size="small" fullWidth required>
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
          </FormControl>
          {/* end: Username */}

          {/* email */}
          <FormControl size="small" fullWidth required>
            <FormLabel>Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              defaultValue={profile.attributes?.email}
              inputRef={register()}
            />
            <FormHelperText>Email will not be publicly displayed</FormHelperText>
          </FormControl>

          {/* password */}
          <FormControl size="small" fullWidth required>
            <FormLabel>Password</FormLabel>
            <OutlinedInput id="password" name="password" type="password" autoComplete="off" inputRef={register()} />
            <FormHelperText>Minimum 3 characteres</FormHelperText>
          </FormControl>
        </form>
      </CardContent>
      <CardActions>
        <Button type="submit">Save</Button>
      </CardActions>
    </Card>
  )
}
