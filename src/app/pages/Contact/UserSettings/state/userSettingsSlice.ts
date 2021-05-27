import { createSlice } from '@reduxjs/toolkit'
const initialUserSettingsState = {
    listLoading: true,
    actionsLoading: false,
    users: {
    },
    userProfile: {
    },
    userSettings: {

    },
    success: null as any,
    response: null as any,
    error: null as any,
  }
  export const callTypes = {
    list: 'list',
    action: 'action',
  }

  export const userSettingsSlice = createSlice({
    name: 'userSettings',
    initialState: initialUserSettingsState,
    reducers: {
        // when error occurs catch it
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`
            state.success = false
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false
            } else {
                state.actionsLoading = false
            }
        },
        // set the state in which the process is in loading or setting the state
        startCall: (state, action) => {
            state.error = null
            state.success = null
            state.response = null
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true
            } else {
                state.actionsLoading = true
            }
        },
        // update the list of all users
        usersFetched: (state, action) => {
            const { data } = action.payload
            state.listLoading = false
            state.users = data
        },
        // update the user settings
        userSettingsFetched: (state, action) => {
            const { data } = action.payload
            state.listLoading = false
            state.userSettings = data
        },
        // update the user profile
        userProfileFetched: (state, action) => {
            const { data } = action.payload
            state.listLoading = false
            state.userProfile = data
        },
        profileUpdated: (state, action) => {
            const { data } = action.payload
            state.actionsLoading = false
            state.userProfile = data
        },
        settingsCreated: (state, action) => {
            const { data } = action.payload
            state.actionsLoading = false
            state.userSettings = data
        }
    },
  })