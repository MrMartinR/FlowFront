import { createSlice } from '@reduxjs/toolkit'

const initialAuthState = {
    loading: false,
    error: null as any,
    success: null as any,
    user: null as any,
    client: null as any,
    expiry: null as any,
    token: null as any,
    role: null as any,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        // when error occurs catch it
        catchError: (state, action) => {
            state.error = `${action.type}: ${action.payload.error}`
            state.loading = false;
            state.success = false;
        },
        // set the state in which the process is in loading or setting the state
        startCall: (state) => {
            state.error = null;
            state.loading = true;
            state.success = null;
        },
  
        login: (state, action) => {
            const { data, token, success, role } = action.payload;
            state.loading = false;
            state.success = success;
            state.client = token.client;
            state.token = token.token;
            state.expiry = token.expiry;
            state.role = role;
            state.user = { ...data, fullname: data.uid };
        },
        register: (state, action) => {
            state.success = true;
            state.loading = false;
        },
        logout: (state, action) => {
            state.loading = false;
            state.success = action.payload.success;
            state.client = null;
            state.token = null;
            state.expiry = null;
            state.role = null;
            state.user = null;
        },
        userLoaded: (state, action) => {
            const { user } = action.payload
            state = { ...state, user, success : true, loading : false}
        },
        resetSuccess: (state, action) => {
            const { success } = action.payload
            state.success = success
        },
        passwordRequested: (state, action) => {
            const { data } = action.payload
            state.user = data;
        },
        passwordChanged: (state, action) => {
            const { data } = action.payload
            state.user = data;
        },
    },
});