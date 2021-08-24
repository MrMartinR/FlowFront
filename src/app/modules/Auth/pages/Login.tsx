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
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
  image: {
    width: '170px',
    heigth: '170px',
  },
})
/**
 * User login component
 */
export const Login = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const resetSuccess = () => {
    dispatch(authActions.resetSuccess())
  }
  /* set the types */
  type Credentials = {
    username: string
    password: string
  }
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username should be at least 3 characters.')
      .max(50, 'Username should be less than 50 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(3, 'Password should be at least 3 characters.')
      .max(50, 'Password should be less than 50 characters'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LoginSchema),
  })
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
    <Grid container direction="column" className={classes.root}>
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
              <OutlinedInput name="username" type="text" autoComplete="on" inputRef={register()} fullWidth />
              {errors.username && <Alert severity="error">{errors.username.message}</Alert>}
            </FormControl>
            {/* end: Username */}

            {/* begin: Password */}
            <FormControl fullWidth size="small">
              <FormLabel>Password</FormLabel>
              <OutlinedInput name="password" type="password" autoComplete="on" inputRef={register()} fullWidth />
              {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
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
