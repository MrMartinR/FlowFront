import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core'

import * as userSettingsActions from './state/userSettingsActions'
import { RootState } from '../../../../redux/rootReducer'
import { PersonalInformation } from './PersonalInformation'
import { AccountInformation } from './AccountInformation'
import { ChangePassword } from './ChangePassword'


export const UserSettings = () => {
  const { userSettingsState } = useSelector(
    (state: RootState) => ({
      userSettingsState: state.userSettings,
    }),
    shallowEqual,
  )
  const [settings, setSettings] = useState({})
  const [profile, setProfile] = useState({})
  // contact Redux state
  const dispatch = useDispatch()
  const GetUserSettings = () => {
    useEffect(() => {
      if (dispatch) {
        dispatch(userSettingsActions.fetchUserSettings())
      }
    }, [])
  }
  GetUserSettings();

  useEffect(() => {
    if (userSettingsState.userSettings) {
      setSettings(userSettingsState.userSettings)
    }
  }, [userSettingsState.userSettings])

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
  
  return (
    <Card> 
      <CardHeader title="Settings" subheader="Update your account and settings" align = 'center'/>
      <CardContent>
        <Grid  container direction="row" justify="space-around">
        {/* Personal Information */}
          <Grid item xs={4}>
            <Card raised style={{ height:'100%' }}>
              <CardHeader title="Personal Information" />
              <CardContent>
                <PersonalInformation />
              </CardContent>
            </Card>
          </Grid>
            {/* Account Information */}
            <Grid item xs={4}>
              <Card raised style={{ height:'100%' }}>
                <CardHeader title="Account Information" />
                <CardContent>
                  <AccountInformation />
                </CardContent>
              </Card>
            </Grid>
            {/* Change Password */}
            <Grid item xs={3}>
              <Card raised style={{ height:'100%' }}>
                <CardHeader title="Change Password" />
                <CardContent>
                  <ChangePassword />  
                </CardContent>
              </Card>
            </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
