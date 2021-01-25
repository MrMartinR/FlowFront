import React, { useState } from 'react'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { TextField, Button, Grid, Typography, CardMedia } from '@material-ui/core'
import * as auth from '../_redux/authRedux.js'
import { login } from '../_redux/authCrud'
import Logo from '../../../../common/media/flow-logo.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormControl } from '@material-ui/core'

/**
 * User login component
 * @param {object} props
 * @author Zeeshan A
 */
function Login(props: any) {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required')
  })

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  type Credentials = {
    email: String
    password: String
  }

  const onSubmit = ({ email, password }: Credentials) => {
    localStorage.removeItem('forgot_pwd_notif')
    enableLoading()
    setTimeout(() => {
      login(email, password)
        .then((res) => {
          disableLoading()
          const userData = res.data.data
          const { uid } = userData
          const { client, expiry, token } = res.data.token
          const accessToken = token.token
          props.login(accessToken, uid, client, expiry, token, userData)
        })
        .catch(() => {
          disableLoading()
        })
    }, 1000)
  }

  return (
    // main Grid
    <Grid container direction="column" justify="space-around" alignItems="center">
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Hello Flower!
        </Typography>
      </Grid>
      {/* form */}
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
              <Button type="submit">
                Sign In
                {loading}
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}

export default connect(null, auth.actions)(Login)
