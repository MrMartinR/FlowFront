import { Link } from 'react-router-dom'
import {
  makeStyles,
  Grid,
  FormLabel,
  OutlinedInput,
  FormHelperText,
  Button,
  Typography,
  CardMedia,
  FormControl,
} from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { UserAlert } from '../../../utils/UserAlert'
import { RootState } from '../../../../redux/rootReducer'
import { useEffect, useState } from 'react'
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
})

const initialValues = {
  email: '',
}

type PasswordType = {
  email: string
}

export const ForgotPassword = () => {
  /* styles */
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, errors } = useForm({
    defaultValues: initialValues,
  })
  const dispatch = useDispatch()
  const onSubmit = ({ email }: PasswordType) => {
    dispatch(authActions.requestPassword(email))
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
  useEffect(() => {
    setLoading(currentState.loading)
  }, [currentState.loading])
  return (
    <Grid container direction="column" justify="space-around" alignItems="center" className={classes.root}>
      {/* logo */}
      <Grid item xs={12}>
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Password Recovery
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Email */}
            <FormControl fullWidth size="small">
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                name="email"
                type="email"
                autoComplete="on"
                inputRef={register({
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
                fullWidth
              />
              <FormHelperText>
                Enter your linked Flow email to receive instructions to set a new password
              </FormHelperText>
              {errors.email && errors.email.type === 'required' && <Alert severity="error">Email is required</Alert>}
              {errors.email && errors.email.type === 'minLength' && (
                <Alert severity="error">Email should be at-least 3 characters.</Alert>
              )}
              {errors.email && errors.email.type === 'maxLength' && (
                <Alert severity="error">Email should be less than 50 characters.</Alert>
              )}
              {errors.email && errors.email.type === 'pattern' && (
                <Alert severity="error">{errors.email.message}</Alert>
              )}
            </FormControl>
            {/* end: Email */}

            <Button disabled={loading} type="submit" color='primary'>Request new Password</Button>
            <Typography variant="body2" align="center">
              Already registered? <Link to="/auth/login">Sign in</Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
      {/* Alert */}
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />
    </Grid>
  )
}
