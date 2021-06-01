import * as requestFromServer from './userSettingsCrud'
import { userSettingsSlice, callTypes } from './userSettingsSlice'

const { actions } = userSettingsSlice

// fetch all users
export const fetchUsers = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getUsers()
    .then((response) => {
      const { data } = response
      dispatch(actions.usersFetched(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Users"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

// fetch all users
export const fetchUserSettings = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getUserSettings()
    .then((response) => {
      const { data } = response
      dispatch(actions.userSettingsFetched(response))
    })
    .catch((error) => {
      error.clientMessage = "Can't find User Settings"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

// fetch all users
export const fetchUserProfile = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getUserProfile()
    .then((response) => {
      const { data } = response
      dispatch(actions.userProfileFetched(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find User Profile"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const updateProfile = (username:string, email:string, password:string) => (dispatch: any) =>{
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
  .updateProfile(username, email, password)
  .then((response) => {
    const { data } = response
    console.log(response)
    //dispatch(actions.profileUpdated(response))
  })
  .catch((error) => {
    error.clientMessage = "Can't find user profile"
    dispatch(actions.catchError({ error, calltype: callTypes.action }))
  })
}

export const createSettings = (data: any) => (dispatch: any) =>{
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
  .createSettings(data)
  .then((response) => {
    const { data } = response;
    dispatch(actions.settingsCreated(data))
  })
  .catch((error) => {
    error.clientMessage = "Can't create user settings"
    dispatch(actions.catchError({ error, calltype: callTypes.action }))
  })
}
