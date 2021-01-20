// TODO: Replace formik for react hook forms https://react-hook-form.com
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import * as Yup from 'yup'
import { injectIntl } from 'react-intl'
import { TextField } from '@material-ui/core'
import * as auth from '../_redux/authRedux'
import { useForm } from "react-hook-form";
import { requestPassword } from '../_redux/authCrud'
import { yupResolver } from "@hookform/resolvers/yup";

const initialValues = {
  email: '',
}

type PasswordType = {
  email: String; 
};

function ForgotPassword(props: any) {
  const { intl } = props
  const [isRequested, setIsRequested] = useState(false)
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required("Required"),
    // .required(
    //   intl.formatMessage({
    //     id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //   })
    // ),
  })

  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: initialValues,
  });

  // const getInputClasses = (fieldname) => {
  //   if (formik.touched[fieldname] && formik.errors[fieldname]) {
  //     return "is-invalid";
  //   }

  //   if (formik.touched[fieldname] && !formik.errors[fieldname]) {
  //     return "is-valid";
  //   }

  //   return "";
  // };

  const onSubmit = ({ email }: PasswordType) => {
    requestPassword(email)
      .then((res) => {
        setIsRequested(true)
        localStorage.setItem('forgot_pwd_notif', res.data.message)
      })
      .catch(() => {
        setIsRequested(false)
        localStorage.setItem('forgot_pwd_notif', '')
      })
  }
 
  return (
    <>
      {isRequested && <Redirect to='/auth' />}
      {!isRequested && (
        <div className='login-form login-forgot' style={{ display: 'block' }}>
          <div className='text-center mb-10 mb-lg-20'>
            <h3 className='font-size-h1'>Forgotten Password ?</h3>
            <div className='text-muted font-weight-bold'>
              Reset your password
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp'
          >
            {/* {formik.status && (
              <div className='mb-10 alert alert-custom alert-light-danger alert-dismissible'>
                <div className='alert-text font-weight-bold'>
                  {formik.status}
                </div>
              </div>
            )} */}
            <div className='form-group fv-plugins-icon-container'>
              <TextField
                // id="outlined-uncontrolled"
                label='Email'
                margin='normal'
                variant='outlined'
                // autoComplete
                type='email'
                name='email'
                inputRef={register()}
              // {...formik.getFieldProps('email')}
              />
            </div>
            <span> {errors.email && errors.email.message}</span>
            <div className='form-group d-flex flex-wrap flex-center'>
              <button
                id='kt_login_forgot_submit'
                type='submit'
                className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4'
                disabled={formState.isSubmitting}
              >
                Submit
              </button>
              <Link to='/auth'>
                <button
                  type='button'
                  id='kt_login_forgot_cancel'
                  className='btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4'
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

export default injectIntl(connect(null, auth.actions)(ForgotPassword))
