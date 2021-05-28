import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardHeader, CardContent, TextField, Typography } from '@material-ui/core'

import * as userSettingsActions from './state/userSettingsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useForm } from 'react-hook-form'


export const UserSettings = () => {
  const { userSettingsState } = useSelector(
    (state: RootState) => ({
      userSettingsState: state.userSettings,
    }),
    shallowEqual,
  )
  const { register, handleSubmit, errors } = useForm();
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
  GetUserProfile();

  useEffect(() => {
    if (userSettingsState.userProfile) {
      setProfile(userSettingsState.userProfile)
    }
  }, [userSettingsState.userProfile])
  const onSubmit = (data: any, e: any) => { 
    const formData = new FormData();
    formData.append("user[username]", data.username);
    formData.append("user[email]", data.email);
    formData.append("user[password]", data.password);
    dispatch(userSettingsActions.updateProfile(formData));
  }
  console.log(profile.attributes?.username)
  return (
    <Card> 
      <CardHeader title="Settings" subheader="Update your account and settings" align = 'center'/>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction='column'>
            {/* username */}
              <TextField
                margin="normal"
                variant="outlined"
                defaultValue = { profile.attributes?.username }
                autoComplete="true"
                type="text"
                name="username"
                inputRef={register()}
              />

            {/* email */}
              <TextField
                label="Email"
                margin="normal"
                defaultValue = { profile.attributes?.email }
                variant="outlined"
                autoComplete="true"
                type="email"
                name="email"
                inputRef={register()}
              />
              <Typography variant='body2'>
                Email will not be publicly displayed
              </Typography>

            {/* Password */}
              <TextField
              label="Password"
              margin="normal"
              variant="outlined"
              autoComplete="off"
              type="password"
              inputRef={register()}
              name="password"
          />
        </Grid>
      </form>
    </CardContent>
  </Card>
  )
}
