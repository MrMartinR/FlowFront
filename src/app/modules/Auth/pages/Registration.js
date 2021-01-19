// TODO: Replace formik for react hook forms https://react-hook-form.com
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { FormattedMessage, injectIntl } from 'react-intl'
import { TextField } from '@material-ui/core'
import * as auth from '../_redux/authRedux'
import { registeration } from '../_redux/authCrud'
import { toAbsoluteUrl } from '../../../../_metronic/_helpers'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

const initialValues = {
  fullname: '',
  email: '',
  username: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

function Registration(props) {
  const { intl } = props
  const [loading, setLoading] = useState(false)

  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    // .required(
    //   intl.formatMessage({
    //     id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //   })
    // ),
    username: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    // .required(
    //   intl.formatMessage({
    //     id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //   })
    // ),
    password: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    // .required(
    //   intl.formatMessage({
    //     id: 'AUTH.VALIDATION.REQUIRED_FIELD',
    //   })
    // ),
    acceptTerms: Yup.bool().required(
      'You must accept the terms and conditions'
    ),
  })

  const { register, handleSubmit, watch, errors, formState } = useForm({ resolver: yupResolver(RegistrationSchema), defaultValues: initialValues });
  const watchAcceptTerms = watch("acceptTerms", false); // you can supply default value as second argument

  // console.log('errors: ', errors);
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
  const onSubmit = (values) => {
    console.log('values: ', values);
    enableLoading()
    registeration(values.email, values.fullname, values.username, values.password).then((res) => {
      const accessToken = res.headers['access-token']
      const { uid } = res.headers
      props.login(accessToken, uid)
      disableLoading()
    })
      .catch((error) => {
        // setSubmitting(false)
        // console.log(error.response.data.errors.full_messages);
        // setStatus(
        //   intl.formatMessage({
        //     id: error.response.data.errors.full_messages.join('   |   '),
        //   })
        // )
        disableLoading()
      })
  }

  return (
    <div className='login-form login-signin' style={{ display: 'block' }}>
      <img
        alt='Logo'
        className='max-h-70px max-h-md-100px d-block m-auto'
        src={toAbsoluteUrl('/media/logos/flow-logo.svg')}
      />
      <div className='text-center mb-10 mb-lg-20'>
        <h3 className='font-size-h1'>
          <FormattedMessage id='AUTH.REGISTER.TITLE' />
        </h3>
        <p className='text-muted font-weight-bold' />
      </div>

      <form
        id='kt_login_signin_form'
        className='form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* begin: Alert */}
        {/* {formik.status && (
          <div className='mb-10 alert alert-custom alert-light-danger alert-dismissible'>
            <div className='alert-text font-weight-bold'>{formik.status}</div>
          </div>
        )} */}
        {/* end: Alert */}

        {/* begin: Username */}
        <div className='form-group fv-plugins-icon-container'>
          <TextField
            id='outlined-uncontrolled'
            label='Username'
            margin='normal'
            variant='outlined'
            autoComplete
            type='text'
            name='username'
            inputRef={register()}
          />
        </div>
        <span> {errors.username && errors.username.message}</span>
        {/* end: Username */}

        {/* begin: Email */}
        <div className='form-group fv-plugins-icon-container'>
          <TextField
            id='outlined-uncontrolled'
            label='Email'
            margin='normal'
            variant='outlined'
            autoComplete
            type='email'
            name='email'
            inputRef={register()}
          />
        </div>
        <span> {errors.email && errors.email.message}</span>
        {/* end: Email */}

        {/* begin: Password */}
        <div className='form-group fv-plugins-icon-container'>
          <TextField
            id='outlined-uncontrolled'
            label='Password'
            margin='normal'
            variant='outlined'
            autoComplete
            type='password'
            name='password'
            inputRef={register()}
          />         
        </div>
        <span> {errors.password && errors.password.message}</span>

        {/* end: Password */}

        {/* begin: Terms and Conditions */}
        <div className='form-group'>
          <label htmlFor='acceptTerms' className='checkbox'>
            <input
              type='checkbox'
              name='acceptTerms'
              id="acceptTerms"
              ref={register()}
            />{' '}
            <Link to='/terms' target='_blank' rel='noopener noreferrer'>
              I accept the Term & Conditions
            </Link>
            .
            <span />
          </label>
        </div>
        <span> {errors.acceptTerms && errors.acceptTerms.message}</span>
        {/* end: Terms and Conditions */}
        <div className='form-group d-flex flex-wrap flex-center'>
          <button
            type='submit'
            // disabled={formik.isSubmitting || !formik.values.acceptTerms}
            disabled={formState.isSubmitting || !watchAcceptTerms}
            className='btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4'
          >
            <span>Sign Up</span>
            {loading && <span className='ml-3 spinner spinner-white' />}
          </button>

          <Link to='/auth/login'>
            <button
              type='button'
              className='btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4'
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
