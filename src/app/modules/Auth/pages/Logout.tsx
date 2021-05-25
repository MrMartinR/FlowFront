/* eslint-disable no-shadow */
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import * as authActions from '../state/authActions'
export const Logout = () => {
    const dispatch = useDispatch()
    dispatch(authActions.logout())
    return (
        <Redirect  to="/auth/login" />
    )
}
