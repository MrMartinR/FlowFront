import React, { useState } from 'react'
// import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import * as auth from '../_redux/authRedux'
import { login } from '../_redux/authCrud'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

// email: "user1@example.com",
// password: "samurai1",<Toast>

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
            // Toast.Body("test")
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
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <img
        alt="Logo"
        className="max-h-70px max-h-md-100px d-block m-auto"
        src={toAbsoluteUrl('/media/logos/flow-logo.svg')}
      />
      <div className="text-center mb-5 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold" />
      </div>
      {/* end::Head */}

      {/* begin::Form */}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
        autoComplete="on"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          ''
        )}
        {(localStorage.getItem('forgot_pwd_notif') === null) === false ? (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
              {localStorage.getItem('forgot_pwd_notif')}
            </div>
          </div>
        ) : (
          ''
        )}

        <div className="form-group">
          <TextField
            // id="outlined-uncontrolled"
            label="Email"
            margin="normal"
            variant="outlined"
            autoComplete
            type="email"
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="ml-5 fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <TextField
            // id="outlined-uncontrolled"
            label="Password"
            margin="normal"
            variant="outlined"
            autoComplete
            type="password"
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="ml-5 fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>

        {/* forgot password */}
        {/* <div className="form-group text-right">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
          </Link>
        </div> */}

        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          {/* <Link
            to="/auth/registration"
            className="btn btn-primary font-weight-bold px-20 py-4 my-3"
            id="kt_login_signup"
          >
            Sign Up
          </Link> */}
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-primary font-weight-bold px-20 py-4 my-3"
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white" />}
          </button>
        </div>
      </form>
      {/* end::Form */}
    </div>
    // </>
  )
}

export default injectIntl(connect(null, auth.actions)(Login))
