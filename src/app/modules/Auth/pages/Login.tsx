import { useEffect, useState } from 'react'
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
import { RootState } from '../../../../redux/rootReducer'
import { Link } from 'react-router-dom'
import { UserAlert } from '../../../utils/UserAlert'
import { Alert } from '@material-ui/lab'

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
  image:{
    width:'170px',
    heigth:'170px'
  }
})

/**
 * User login component
 */
export const Login = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const resetSuccess = () => {
    dispatch(authActions.resetSuccess())
  }
  /* set the types */
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
    dispatch(authActions.login(username, password))
  }
  return (
    /* main grid */
    <Grid container direction='column' className={classes.root}>
      {/* logo */}
      <Grid item xs={2}>
        <CardMedia src={Logo} className={classes.image} component="img" />
      </Grid>
      {/* form */}
      <Grid item>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column">
            {/* begin: Username */}
            <FormControl fullWidth size="small">
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                name="username"
                type="text"
                autoComplete="on"
                inputRef={register({ required: true, minLength: 3, maxLength: 50 })}
                fullWidth
              />
              {errors.username && errors.username.type === 'required' && (
                  <Alert severity="error">Username is required</Alert>
                )}
              {errors.username && errors.username.type === 'minLength' && (
                  <Alert severity="error">Username should be at-least 3 characters.</Alert>
                )}
              {errors.username && errors.username.type === 'maxLength' && (
                  <Alert severity="error">Username should be less than 50 characters.</Alert>
                )}
            </FormControl>
            {/* end: Username */}

            {/* begin: Password */}
            <FormControl fullWidth size="small">
              <FormLabel>Password</FormLabel>
              <OutlinedInput
                name="password"
                type="password"
                autoComplete="on"
                inputRef={register({ required: true, minLength: 3, maxLength: 50 })}
                fullWidth
              />
              {errors.password && errors.password.type === 'required' && (
                  <Alert severity="error">Password is required</Alert>
                )}
              {errors.password && errors.password.type === 'minLength' && (
                  <Alert severity="error">Password should be at-least 3 characters.</Alert>
                )}
              {errors.password && errors.password.type === 'maxLength' && (
                  <Alert severity="error">Password should be less than 50 characters.</Alert>
                )}
            </FormControl>
            {/* end: Password */}
            <Button disabled={loading} type="submit" color="primary">
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
        <UserAlert
          resetSuccess={resetSuccess}
          success={currentState.success}
          message={currentState.message}
          error={currentState.error}
        />
      </Grid>
    </Grid>
  )
}
