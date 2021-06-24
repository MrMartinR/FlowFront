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
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .min(3, 'Email should be at least 3 characters.')
      .email('Entered value does not match email format'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
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
              <OutlinedInput name="email" autoComplete="on" inputRef={register()} fullWidth />
              <FormHelperText>
                Enter your linked Flow email to receive instructions to set a new password
              </FormHelperText>
              {errors.email && <Alert severity="error">{errors.email.message}</Alert>}
            </FormControl>
            {/* end: Email */}

            <Button disabled={loading} type="submit" color="primary">
              Request new Password
            </Button>
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
