import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'

import { TextField, Button, Grid, Typography, CardMedia, FormControl } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'

const initialValues = {
  email: '',
}

type PasswordType = {
  email: string
}

export const ForgotPassword = (props: any) => {
  const [isRequested, setIsRequested] = useState(false)
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Required'),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  })
  const dispatch =  useDispatch();
  const onSubmit = ({ email }: PasswordType) => {
    dispatch(authActions.requestUser(email));
  }

  return (
    <Grid container direction="column" justify="space-around" alignItems="center">
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Forgotten Password ?
        </Typography>
      </Grid>
      {/* form */}
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <Grid item xs="auto">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
            <Grid container direction="column" justify="center" alignItems="center">
              {(localStorage.getItem('forgot_pwd_notif') === null) === false ? (
                <div>{localStorage.getItem('forgot_pwd_notif')}</div>
              ) : (
                ''
              )}
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
              </FormControl>
              <FormControl variant="filled">
                <Button type="submit">Submit</Button>
                <Link to="/auth">
                  <Button
                    type="button"
                    id="kt_login_forgot_cancel"
                    variant = 'contained'
                    color = 'secondary'
                  >
                    Cancel
                  </Button>
                </Link>
              </FormControl>
            </Grid>
          </form>
        </Grid>
      )}
    </Grid>
  )
}
