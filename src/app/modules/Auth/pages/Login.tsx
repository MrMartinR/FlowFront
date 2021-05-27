import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { TextField, Button, Grid, Typography, CardMedia } from '@material-ui/core'
import * as authActions from '../state/authActions'
import Logo from '../../../../common/media/flow-logo.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl } from '@material-ui/core'
import { RootState } from '../../../../redux/rootReducer'
import { Link } from 'react-router-dom'
import { AuthAlert } from './AuthAlert'
/**
 * User login component
 * @author Zeeshan A
 */
export const Login = () => {
  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
  })

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const dispatch =  useDispatch();
  type Credentials = {
    username: string
    password: string
  }
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.auth,
    }),
    shallowEqual
  )
  useEffect( () => {
    setLoading(currentState.loading);
  }, [currentState.loading]);

  const onSubmit = ({ username, password }: Credentials) => {
    localStorage.removeItem('forgot_pwd_notif')
    dispatch(authActions.login(username, password));
  }
  return (
    // main Grid
    <Grid container direction="column" alignItems="center">
      {/* logo */}
      <Grid item>
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Hello Flower!
        </Typography>
      </Grid>
      {/* form */}
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Username */}
            <FormControl variant="filled">
              <TextField
                label="Username"
                margin="normal"
                variant="outlined"
                autoComplete="on"
                type="text"
                inputRef={register()}
                name="username"
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Password */}
            <FormControl variant="filled">
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="on"
                type="password"
                inputRef={register()}
                name="password"
              />
              <span> {errors.password && errors.password.message}</span>
              
              <Button disabled = { loading } type="submit" color = 'secondary' variant = 'contained'>
                  Sign In
              </Button>
            </FormControl>
            {/* end: Password */}
          </Grid>
        </form>
        <Typography variant = 'body2' paragraph>
          Don't have a flow account yet? <Link rel="noreferrer" to="/auth/registration">
            Sign up
          </Link>
        </Typography>
        <Typography variant = 'body2'>
          Forgot your <Link rel="noreferrer" to="/auth/forgot-password">
            password?
          </Link>
        </Typography>
        <AuthAlert />
      </Grid>
    </Grid>
  )
}
