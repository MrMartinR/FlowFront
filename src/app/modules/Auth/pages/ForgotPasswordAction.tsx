import { Link, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Logo from '../../../../common/media/flow-logo.svg'
import { useDispatch } from 'react-redux'
import { Button, CardMedia, FormControl, Grid, TextField, Typography } from '@material-ui/core'
import { AuthAlert } from './AuthAlert'
import queryString from 'query-string'

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
  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Required'),
    changepassword: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required')
      .when('password', {
        is: (val: any) => !!(val && val.length > 0),
        then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
      }),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  })
  const dispatch = useDispatch()
  const onSubmit = ({ password, changepassword }: ForgotPasswordType) => {
    dispatch(authActions.changePassword(password, changepassword, token, client, uid, expiry))
  }

  return (
    <Grid container direction="column" justify="space-around" alignItems="center">
      <AuthAlert />
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
                inputRef={register()}
                name="password"
              />
              <span> {errors.password && errors.password.message}</span>
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
                inputRef={register()}
              />
              <span> {errors.changepassword && errors.changepassword.message}</span>
              {/* end: Confirm Password */}
              <Button type="submit" variant="contained" color="secondary">
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
