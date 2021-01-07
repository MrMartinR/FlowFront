/* eslint-disable global-require */
import React, { useState } from "react"
import { useFormik } from "formik"
import { connect } from "react-redux"
import { Link, Redirect, useHistory } from "react-router-dom"
import * as Yup from "yup"
import { injectIntl } from "react-intl"
import * as auth from "../_redux/authRedux"
import { submitRequestPassword } from "../_redux/authCrud"

const initialValues = {
  email: "",
}

function ForgotPasswordAction({ location, intl }) {
  // var quer = this.props.location.query.__firebase_request_key;
  // alert('asdfadsf');

  const { search } = location
  const queryString = require("query-string")
  const parsed = queryString.parse(search)
  const accessToken = parsed["access-token"]
  const { client } = parsed
  const { uid } = parsed
  const { expiry } = parsed
  const [isRequested, setIsRequested] = useState(false)
  const history = useHistory()
  const ForgotPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    changepassword: Yup.string()
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      )
      .when("password", {
        is: (val) => !!(val && val.length > 0),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password and Confirm Password didn't match"
        ),
      }),
  })

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid"
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid"
    }

    return ""
  }

  const formik = useFormik({
    initialValues,
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      submitRequestPassword(
        values.password,
        values.changepassword,
        accessToken,
        client,
        uid,
        expiry
      )
        .then((res) => {
          // alert('sukses');
          localStorage.setItem("forgot_pwd_notif", res.data.message)
          console.log(res)
          history.push("/dashboard")
        })
        .catch(() => {
          setIsRequested(false)
          setSubmitting(false)
          setStatus(
            intl.formatMessage(
              { id: "AUTH.VALIDATION.NOT_FOUND" },
              { name: values.email }
            )
          )
        })
    },
  })

  return (
    <>
      {isRequested && <Redirect to="/auth" />}
      {!isRequested && (
        <div className="login-form login-forgot" style={{ display: "block" }}>
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Forgotten Password ?</h3>
            <div className="text-muted font-weight-bold">
              Reset your password
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
          >
            {formik.status && (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            )}

            {/* begin: Password */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "password"
                )}`}
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.password}</div>
                </div>
              ) : null}
            </div>
            {/* end: Password */}

            {/* begin: Confirm Password */}
            <div className="form-group fv-plugins-icon-container">
              <input
                placeholder="Confirm Password"
                type="password"
                className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                  "changepassword"
                )}`}
                name="changepassword"
                {...formik.getFieldProps("changepassword")}
              />
              {formik.touched.changepassword && formik.errors.changepassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.changepassword}
                  </div>
                </div>
              ) : null}
            </div>
            {/* end: Confirm Password */}
            <div className="form-group d-flex flex-wrap flex-center">
              <button
                id="kt_login_forgot_submit"
                type="submit"
                className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
                disabled={formik.isSubmitting}
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
