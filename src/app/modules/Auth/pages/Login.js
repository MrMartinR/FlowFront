import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
// [REV] Remove the internationalization 
import { FormattedMessage, injectIntl } from 'react-intl'
import { TextField, Button, Grid, Typography, CardMedia } from '@material-ui/core'
import * as auth from '../_redux/authRedux'
import { login } from '../_redux/authCrud'
// [REV] Move the toAbsoluteUrl helper to common folder 
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import Logo from '../../../../common/media/flow-logo.svg';



const initialValues = {
  email: '',
  password: '',
}

function Login(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      console.log('submitting..')
      localStorage.removeItem('forgot_pwd_notif')
      enableLoading()
      setTimeout(() => {
        login(values.email, values.password)
          .then((res) => {
            disableLoading()
            const accessToken = res.data.token.token
            const { uid } = res.data.data
            const { client } = res.data.token
            const userData = res.data.data
            const { expiry } = res.data.token
            const { token } = res.data.token
            props.login(accessToken, uid, client, expiry, token, userData)
          })
          .catch(() => {
            disableLoading()
            setSubmitting(false)
            setStatus(
              intl.formatMessage({
                id: 'AUTH.VALIDATION.INVALID_LOGIN',
              }),
            )
          })
      }, 1000)
    },
  })

  return (
    // main Grid 
    <Grid 
      container 
      direction='row' 
      xs={6} 
      spacing={2} 
      align = "center" 
      justify = "center" 
      alignItems = "center" 
    >

     {/* begin::Head */}
      <Grid item xs={5} spacing={2}>
          <CardMedia 
          src={Logo} 
          component="img" 
          />
        <Typography 
          align='center'
          variant='h4'
          >
          Howdy Flower!
        </Typography>
      </Grid>

{/* form */}
      <Grid item xs={6}>
        <form
        onSubmit={formik.handleSubmit}
        autoComplete="on"
      >
        {formik.status ? (
            <div>{formik.status}</div>
        ) : (
          ''
        )}
        {(localStorage.getItem('forgot_pwd_notif') === null) === false ? (
          <div>
            <div>
              {localStorage.getItem('forgot_pwd_notif')}
            </div>
          </div>
        ) : (
          ''
        )}

        <div>
          <TextField
            label="Email"
            margin="normal"
            variant="outlined"
            autoComplete
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>
              <div>{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div>
          <TextField
            label="Password"
            margin="normal"
            variant="outlined"
            autoComplete
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>
              <div>{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        <div>

          <Button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
          >
            <span>Sign In</span>
            {loading && <span />}
          </Button>
        </div>
      </form>
    </Grid>
    </Grid>

  )
}

export default injectIntl(connect(null, auth.actions)(Login))
