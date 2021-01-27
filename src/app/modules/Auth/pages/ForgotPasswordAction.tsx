import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { injectIntl } from 'react-intl'
import * as auth from '../_redux/authRedux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { submitRequestPassword } from '../_redux/authCrud'

const initialValues = {
  password: '',
  changepassword: '',
}

type ForgotPasswordType = {
  password: any
  changepassword: any
}

/**
 * User registration component
 * @param {object} props
 * @author Zeeshan A
 */
function ForgotPasswordAction(props: any) {
  const { location, intl } = props
  const { search } = location
  const queryString = require('query-string')
  const parsed = queryString.parse(search)
  const accessToken = parsed['access-token']
  const { client } = parsed
  const { uid } = parsed
  const { expiry } = parsed
  const [isRequested, setIsRequested] = useState(false)
  const history = useHistory()
  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        })
      )
      .when('password', {
        is: (val: any) => !!(val && val.length > 0),
        then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
      }),
  })

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  })

  const onSubmit = ({ password, changepassword }: ForgotPasswordType) => {
    submitRequestPassword(password, changepassword, accessToken, client, uid, expiry)
      .then((res) => {
        localStorage.setItem('forgot_pwd_notif', res.data.message)
        console.log(res)
        history.push('/dashboard')
      })
      .catch(() => {
        setIsRequested(false)
      })
  }

  const getInputClasses = (fieldname: any) => {
    let len = Object.keys(formState.touched).length

    if (len) {
      let touchedIndex = Object.entries(formState.touched).findIndex(([key, value]) => key === fieldname)
      let errorIndex = Object.entries(formState.errors).findIndex(([key, value]) => key === fieldname)

      if (touchedIndex >= 0 && errorIndex >= 0) {
        return 'is-invalid'
      } else {
        return 'is-valid'
      }
    }

    return ''
  }

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: 'block' }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Forgotten Password ?</h3>
            <div className="text-muted font-weight-bold">Reset your password</div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {/* begin: Password */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('password')}`}
                name="password"
                ref={register()}
              />
            </div>
            <span> {errors.password && errors.password.message}</span>
            {/* end: Password */}

            {/* begin: Confirm Password */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Confirm Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses('changepassword')}`}
                name="changepassword"
                ref={register()}
              />
            </div>
            <span> {errors.changepassword && errors.changepassword.message}</span>
            {/* end: Confirm Password */}
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formState.isSubmitting}
              >
                Submit
              </button>
              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default injectIntl(connect(null, auth.actions)(ForgotPasswordAction))
