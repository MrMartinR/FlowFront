import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { TextField, Button, Grid, Typography, CardMedia, FormControl } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { AuthAlert } from './AuthAlert'

const initialValues = {
  email: '',
}

type PasswordType = {
  email: string
}

export const ForgotPassword = () => {
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

  return (
    <Grid container direction="column" justify="space-around" alignItems="center">
      <AuthAlert />
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Forgotten Password ?
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            <FormControl variant="filled">
              <TextField
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="on"
                type="email"
                inputRef={register()}
                name="email"
              />
              <span> {errors.email && errors.email.message}</span>
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
