import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  makeStyles,
  Button,
  Grid,
  Typography,
  CardMedia,
  FormControl,
  FormLabel,
  OutlinedInput,
} from '@material-ui/core'
import * as authActions from '../state/authActions'
import Logo from '../../../../common/media/flow-logo.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RootState } from '../../../../redux/rootReducer'
import { Link } from 'react-router-dom'
import { AuthAlert } from './AuthAlert'

/* Styles */
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #f2f2f2 25%, #ccc 90%)',
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

/**
 * User login component
 */
export const Login = () => {
  const classes = useStyles()

  const loginSchema = Yup.object().shape({
    username: Yup.string().min(6, 'Minimum 6 characters').max(50, 'Maximum 50 characters').required('Required'),
    password: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
  })

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
  })
  const dispatch = useDispatch()
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
  useEffect(() => {
    setLoading(currentState.loading)
  }, [currentState.loading])

  const onSubmit = ({ username, password }: Credentials) => {
    localStorage.removeItem('forgot_pwd_notif')
    dispatch(authActions.login(username, password))
  }
  return (
    /* main grid */
    <Grid container className={classes.root}>
      {/* logo */}
      <Grid item>
        <CardMedia src={Logo} component="img" />
      </Grid>
      {/* form */}
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column">
            {/* begin: Username */}
            <FormControl size="small" fullWidth required>
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                id="username"
                autoComplete="on"
                type="text"
                inputRef={register()}
                name="username"
                fullWidth
                required
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Password */}
            <FormControl size="small" fullWidth required>
              <FormLabel>Password</FormLabel>
              <OutlinedInput
                label="Password"
                autoComplete="on"
                type="password"
                inputRef={register()}
                name="password"
                required
              />
              <span> {errors.password && errors.password.message}</span>
            </FormControl>
            {/* end: Password */}
            <Button disabled={loading} type="submit">
              Sign In
            </Button>
          </Grid>
        </form>
        <Typography variant="body2" paragraph>
          Don't have a Flow account? <Link to="/auth/registration">Sign up</Link>
        </Typography>
        <Typography variant="body2">
          Forgot your <Link to="/auth/forgot-password">password?</Link>
        </Typography>
        <AuthAlert />
      </Grid>
    </Grid>
  )
}
