import { Link } from 'react-router-dom'
import * as Yup from 'yup'

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
import { yupResolver } from '@hookform/resolvers/yup'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { UserAlert } from '../../../utils/UserAlert'
import { RootState } from '../../../../redux/rootReducer'

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

  /* yup schema */
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required'),
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
            <FormControl required fullWidth size="small">
              <FormLabel>Email</FormLabel>
              <OutlinedInput
                id="email"
                name="email"
                type="email"
                required
                autoComplete="on"
                inputRef={register()}
                fullWidth
              />
              <FormHelperText>
                Enter your linked Flow email to receive instructions to set a new password
              </FormHelperText>
              <Typography variant="caption"> {errors.email && errors.email.message}</Typography>
            </FormControl>
            {/* end: Email */}

            <Button type="submit">Request new Password</Button>
            <Typography variant="body2" align="center">
              Already registered? <Link to="/auth/login">Sign in</Link>
            </Typography>
            {/* </FormControl> */}
          </Grid>
        </form>
      </Grid>
      {/* Alert */}
      <UserAlert resetSuccess = {resetSuccess} success={currentState.success} message = {currentState.message} error = {currentState.error} />

    </Grid>
  )
}
