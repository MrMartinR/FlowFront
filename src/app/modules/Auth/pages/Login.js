// TODO: Replace formik for react hook forms https://react-hook-form.com
import React, {useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import {TextField, Button, Grid, Typography, CardMedia} from '@material-ui/core'
import * as auth from '../_redux/authRedux'
import {login} from '../_redux/authCrud'
import Logo from '../../../../common/media/flow-logo.svg'

const initialValues = {
  email: '',
  password: '',
}

function Login(props) {
  const [loading, setLoading] = useState(false)
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      console.log('submitting..')
      localStorage.removeItem('forgot_pwd_notif')
      enableLoading()
      setTimeout(() => {
        login(values.email, values.password)
          .then((res) => {
            disableLoading()
            const accessToken = res.data.token.token
            const {uid} = res.data.data
            const {client} = res.data.token
            const userData = res.data.data
            const {expiry} = res.data.token
            const {token} = res.data.token
            props.login(accessToken, uid, client, expiry, token, userData)
          })
          .catch(() => {
            disableLoading()
            setSubmitting(false)
            setStatus('Incorrect login details')
          })
      }, 1000)
    },
  })

  return (
    // main Grid
    <Grid
      container
      direction='column'
      align='center'
      justify='space-around'
      alignItems='center'
    >
      {/* logo */}
      <Grid item xs='auto'>
        <CardMedia src={Logo} component='img' />
        <Typography align='center' variant='h6'>
          Hello Flower!
        </Typography>
      </Grid>

      {/* form */}
      <Grid item xs='auto'>
        <form onSubmit={formik.handleSubmit} autoComplete='on'>
          {formik.status ? <div>{formik.status}</div> : ''}
          {(localStorage.getItem('forgot_pwd_notif') === null) === false ? (
            <div>
              <div>{localStorage.getItem('forgot_pwd_notif')}</div>
            </div>
          ) : (
            ''
          )}

          <div>
            {/* <InputLabel>Email</InputLabel> */}
            <TextField
              label='Email'
              margin='normal'
              variant='outlined'
              autoComplete='on'
              type='email'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>
                <div>{formik.errors.email}</div>
              </div>
            ) : null}
          </div>
          <div>
            {/* <InputLabel>Password</InputLabel> */}
            <TextField
              label='Password'
              margin='normal'
              variant='outlined'
              autoComplete='on'
              type='password'
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>

          <div>
            <Button type='submit' disabled={formik.isSubmitting}>
              Sign In
              {loading}
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  )
}

export default connect(null, auth.actions)(Login)
