import { Link, useLocation } from 'react-router-dom'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import Logo from '../../../../common/media/flow-logo.svg'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Button, CardMedia, FormControl, Grid, TextField, Typography } from '@material-ui/core'
import queryString from 'query-string'
import { RootState } from '../../../../redux/rootReducer'
import { UserAlert } from '../../../utils/UserAlert'
import { Alert } from '@material-ui/lab'

const initialValues = {
  password: '',
  changepassword: '',
}

type ForgotPasswordType = {
  password: any
  changepassword: any
}

/**
 * Forgot Password Action component
 */
export const ForgotPasswordAction = (props: any) => {
  const { search } = useLocation()
  const { token = '' } = queryString.parse(search)
  const { client = '' } = queryString.parse(search)
  const { uid = '' } = queryString.parse(search)
  const { expiry = '' } = queryString.parse(search)

  const { register, handleSubmit, errors, watch } = useForm({
    defaultValues: initialValues,
  })
  const dispatch = useDispatch()
  const onSubmit = ({ password, changepassword }: ForgotPasswordType) => {
    dispatch(authActions.changePassword(password, changepassword, token, client, uid, expiry))
  }
  const resetSuccess = () => {
    dispatch(authActions.resetSuccess())
  }
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.auth,
    }),
    shallowEqual
  )
  return (
    <Grid container direction="column" justify="space-around" alignItems="center">
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />

      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Forgot your password?
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Password */}
            <FormControl variant="filled">
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="off"
                type="password"
                inputRef={register({ required: true, minLength: 3, maxLength: 50 })}
                name="password"
              />
              {errors.password && errors.password.type === 'required' && (
                  <Alert severity="error">Password is required</Alert>
                )}
              {errors.password && errors.password.type === 'minLength' && (
                  <Alert severity="error">Password should be at-least 3 characters.</Alert>
                )}
              {errors.password && errors.password.type === 'maxLength' && (
                  <Alert severity="error">Username should be less than 50 characters.</Alert>
                )}
            </FormControl>
            {/* end: Password */}

            {/* begin: Confirm Password */}
            <FormControl variant="filled">
              <TextField
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                autoComplete="off"
                type="password"
                name="changepassword"
                inputRef={register({ required: true, minLength: 3, maxLength: 50, validate: (value) => {return value===watch('password')} })}
              />
              {errors.changepassword && errors.changepassword.type === 'required' && (
                  <Alert severity="error">Password is required</Alert>
                )}
              {errors.changepassword && errors.changepassword.type === 'minLength' && (
                  <Alert severity="error">Password should be at-least 3 characters.</Alert>
                )}
              {errors.changepassword && errors.changepassword.type === 'maxLength' && (
                  <Alert severity="error">Username should be less than 50 characters.</Alert>
                )}
              {errors.changepassword && errors.changepassword.type === 'validate' && (
                  <Alert severity="error">Password and Confirm Password didn't match</Alert>
                )}
              {/* end: Confirm Password */}

              <Button type="submit" variant="contained">
                Submit
              </Button>
              <Typography variant="body2" align="center">
                <Link to="/auth/login">Sign in</Link>
              </Typography>
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
