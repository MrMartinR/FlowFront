import React, { useState } from "react"
import { useFormik } from "formik"
import { connect } from "react-redux"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import { FormattedMessage, injectIntl } from "react-intl"
import TextField from "@material-ui/core/TextField"
import * as auth from "../_redux/authRedux"
import { register } from "../_redux/authCrud"
import { toAbsoluteUrl } from "../../../../_metronic/_helpers"

const initialValues = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
}

function Registration(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)
  const RegistrationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    username: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required(
        intl.formatMessage({
          id: "AUTH.VALIDATION.REQUIRED_FIELD",
        })
      ),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  })

  const enableLoading = () => {
    setLoading(true)
  }

  const disableLoading = () => {
    setLoading(false)
  }

  // const getInputClasses = (fieldname) => {
  //   if (formik.touched[fieldname] && formik.errors[fieldname]) {
  //     return "is-invalid";
  //   }

  //   if (formik.touched[fieldname] && !formik.errors[fieldname]) {
  //     return "is-valid";
  //   }

  //   return "";
  // };

  const formik = useFormik({
    initialValues,
    validationSchema: RegistrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading()
      register(values.email, values.fullname, values.username, values.password)
        .then((res) => {
          const accessToken = res.headers["access-token"]
          const { uid } = res.headers
          props.login(accessToken, uid)
          disableLoading()
        })
        .catch((error) => {
          setSubmitting(false)
          // console.log(error.response.data.errors.full_messages);
          setStatus(
            intl.formatMessage({
              id: error.response.data.errors.full_messages.join("   |   "),
            })
          )
          disableLoading()
        })
    },
  })

  return (
    <div className="login-form login-signin" style={{ display: "block" }}>
      <img
        alt="Logo"
        className="max-h-70px max-h-md-100px d-block m-auto"
        src={toAbsoluteUrl("/media/logos/flow-logo.svg")}
      />
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.REGISTER.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold" />
      </div>

      <form
        id="kt_login_signin_form"
        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
        onSubmit={formik.handleSubmit}
      >
        {/* begin: Alert */}
        {formik.status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        )}
        {/* end: Alert */}

        {/* begin: Username */}
        <div className="form-group fv-plugins-icon-container">
          <TextField
            id="outlined-uncontrolled"
            label="Username"
            margin="normal"
            variant="outlined"
            autoComplete
            type="text"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="ml-5 fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        {/* end: Username */}

        {/* begin: Email */}
        <div className="form-group fv-plugins-icon-container">
          <TextField
            id="outlined-uncontrolled"
            label="Email"
            margin="normal"
            variant="outlined"
            autoComplete
            type="email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="ml-5 fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.email}</div>
            </div>
          ) : null}
        </div>
        {/* end: Email */}

        {/* begin: Password */}
        <div className="form-group fv-plugins-icon-container">
          <TextField
            id="outlined-uncontrolled"
            label="Password"
            margin="normal"
            variant="outlined"
            autoComplete
            type="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="ml-5 fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        {/* end: Password */}

        {/* begin: Terms and Conditions */}
        <div className="form-group">
          <label className="checkbox">
            <input
              type="checkbox"
              name="acceptTerms"
              {...formik.getFieldProps("acceptTerms")}
            />{" "}
            <Link to="/terms" target="_blank" rel="noopener noreferrer">
              I accept the Term & Conditions
            </Link>
            .
            <span />
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.acceptTerms}</div>
            </div>
          ) : null}
        </div>
        {/* end: Terms and Conditions */}
        <div className="form-group d-flex flex-wrap flex-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.values.acceptTerms}
            className="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4"
          >
            <span>Sign Up</span>
            {loading && <span className="ml-3 spinner spinner-white" />}
          </button>

          <Link to="/auth/login">
            <button
              type="button"
              className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default injectIntl(connect(null, auth.actions)(Registration))
