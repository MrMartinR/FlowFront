import * as requestFromServer from './authCrud'

import { authSlice } from './authSlice'

const { actions } = authSlice

export const login = (email:any, password:any) => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .login(email, password)
    .then((response) => {
        const { data } = response
        dispatch(actions.login(data))
    })
    .catch((error) => {
        error.clientMessage = "Can't find user"
        dispatch(actions.catchError({ error }))
    })
}

export const logout = () => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .logout()
    .then((response) => {
        const { data } = response
        dispatch(actions.logout(data));
    })
    .catch((error) => {
        dispatch(actions.catchError({ error }));
    })
}
export const registration = (email: string, name: string, username:string, password:string, country_id: string) => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .registration(email, name, username, password, country_id)
    .then((response) => {
        const { data } = response
        console.log(JSON.stringify(response, null, 3));
        dispatch(actions.register(data));
    })
    .catch((error) => {
        dispatch(actions.catchError({ error }));
    })
}

export const requestUser = (token: any) => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .getUserByToken(token)
    .then((response) => {
        const { data } = response
        console.log(JSON.stringify(response), null, 3);
        dispatch(actions.userLoaded(data));
    })
    .catch((error) => {
        dispatch(actions.catchError({ error }));
    })
}

export const requestPassword = (email: any) => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .requestPassword(email)
    .then((response) => {
        const { data } = response
        console.log(JSON.stringify(response), null, 3);
        dispatch(actions.passwordRequested(data));
    })
    .catch((error) => {
        error.clientMessage = "Something happens"
        dispatch(actions.catchError({ error }));
    })
}

export const changePassword = (password: any, passwordConfirmation: any) => (dispatch: any) => {
    dispatch(actions.startCall())
    return requestFromServer
    .submitRequestPassword(password, passwordConfirmation)
    .then((response) => {
        const { data } = response
        console.log(JSON.stringify(response), null, 3);
        dispatch(actions.passwordChanged(data));
    })
    .catch((error) => {
        error.clientMessage = "Something happens"
        dispatch(actions.catchError({error}));
    })
}
export const resetSuccessAuth = () => (dispatch: any) => {
    dispatch( actions.resetSuccess({ success: null }));
  }