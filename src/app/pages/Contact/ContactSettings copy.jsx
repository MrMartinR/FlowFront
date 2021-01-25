/* eslint-disable no-return-assign */
import React from 'react'
import { useEffect, useState } from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import { Grid, TextField, InputLabel, Button, MenuItem, Card, CardHeader, CardContent, Select } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { getAllCountries } from '../Country/countryActions'
import { getUserProfile, updateProfile } from '../../actions/userActions'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'
import { getAllCurrencies } from '../../actions/currencyActions'
import CustomizedSnackbars from '../../utils/snackbar'
import BadgeAvatars from '../../utils/BadgeAvatar'

const Settings = () => {
  const auth = useSelector((state) => state.auth)

  // const classes = {
  //   inputRoot: {
  //     flexWrap: 'wrap',
  //   },
  //   inputInput: {
  //     width: 'auto',
  //     flexGrow: 1,
  //   },
  // }
  const [currencies, setCurrencies] = useState([])
  const [countries, setCountries] = useState([])
  const [userProfile, setUserProfile] = useState({
    avatar_url: toAbsoluteUrl('/media/logos/flow-logo.svg')
  })

  const changePasswordIsDisabled = () => {
    if (userProfile.newPassword) return false

    return true
  }

  const setState = (newState) => {
    setUserProfile({ ...userProfile, ...newState })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getUserProfile(auth)
      .then((res) => setUserProfile(res.data.data[0]))
      .catch((err) => {
        console.log(err)
      })

    getAllCountries(auth)
      .then((res) => setCountries(res.data.data))
      .catch((err) => {
        console.log(err)
      })

    getAllCurrencies(auth)
      .then((res) => {
        const currency = res.data.data.sort((a, b) => {
          if (a.code > b.code) {
            return 1
          }
          if (b.code > a.code) {
            return -1
          }
          return 0
        })
        setCurrencies(currency)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth])

  const handleChange = (e, field) => {
    let data
    if (['country', 'currency'].includes(field)) {
      const { id } = e.currentTarget
      data = { [`${field}_id`]: id }
      setState({ [field]: e.target.value })
    } else {
      data = { [field]: userProfile[field] }
      setState(data)
    }

    updateProfile(auth, data)
      .then((res) => {
        if (res.data && res.data.success) {
          setSnackState({
            message: 'Saved!',
            open: true,
            variant: 'success'
          })
          setState(res.data.data[0])
        }
      })
      .catch((err) => {
        setSnackState({
          message: err.message,
          open: true,
          variant: 'error'
        })
      })
  }

  const [snackState, _setSnackState] = useState({
    message: '',
    variant: 'success',
    open: false
  })
  const variant = 'outlined'

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState })
  }

  const onFileChange = (e) => {
    const file = e.target && e.target.files && e.target.files[0] ? e.target.files[0] : ''
    updateProfile(
      auth,
      {
        avatar: file
      },
      file && file.name ? file.name : false
    )
      .then((res) => {
        if (res.data && res.data.success) {
          setSnackState({
            message: 'Saved!',
            open: true,
            variant: 'success'
          })
          setState({
            avatar_url: res.data.data[0].avatar_url
          })
        }
      })
      .catch((err) => {
        setSnackState({
          message: err.message,
          open: true,
          variant: 'error'
        })
      })
  }

  return (
    <Grid container>
      <Card xs={4}>
        <CardHeader title="Settings" subheader="Update your account and settings" />

        <CustomizedSnackbars
          {...snackState}
          setSnackState={setSnackState}
          handleClose={() => {
            setSnackState({ open: false })
          }}
        />
        <Row>
          <div className="col-lg-12 order-1 order-xxl-2">
            <div className="card">
              <div className="card-body d-flex flex-column">
                <InputLabel className="font-weight-bold my-7 h2">Personal Information</InputLabel>

                <Form.Group as={Row} controlId="formGridAvatar">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Avatar</InputLabel>
                  </Col>
                  <Col>
                    <BadgeAvatars src={userProfile.avatar_url} onFileChange={onFileChange} name={userProfile.name} />
                    <small className="ml-3">Allowed file types jpg, jpeg, png.</small>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridName">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Name</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="text"
                      label="Name"
                      variant={variant}
                      onBlur={(e) => handleChange(e, 'name')}
                      onChange={(e) => setState({ name: e.target.value })}
                      value={userProfile.name ? userProfile.name : ''}
                      size="small"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridSurname">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Surname</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="text"
                      label="Surname"
                      variant={variant}
                      onChange={(e) => setState({ surname: e.target.value })}
                      onBlur={(e) => handleChange(e, 'surname')}
                      value={userProfile.surname ? userProfile.surname : ''}
                      size="small"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridDOB">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Date of Birth</InputLabel>
                  </Col>
                  <Col lg={3}>
                    <TextField
                      className="w-100"
                      type="date"
                      label="Date of Birth"
                      variant={variant}
                      value={userProfile.dob ? userProfile.dob : ''}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChange={(e) => setState({ dob: e.target.value })}
                      onBlur={(e) => handleChange(e, 'dob')}
                      size="small"
                    />
                  </Col>
                  <Col lg={3}>
                    <small>
                      <p className="mb-0 mt-3">Date of Birth will not be publicly displayed</p>
                      <p>Will be use to calculate you FI</p>
                    </small>
                  </Col>
                </Form.Group>

                <div className="separator separator-dashed my-3" />

                <InputLabel className="font-weight-bold my-7 h2">Account Information</InputLabel>

                <Form.Group as={Row} controlId="formGridUsername">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Username</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      label="Username"
                      value={userProfile.username ? userProfile.username : ''}
                      disabled
                      onChange={(e) => setState({ username: e.target.value })}
                      onBlur={(e) => handleChange(e, 'username')}
                      variant={variant}
                      size="small"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridEmail">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Email</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      className="w-100"
                      type="email"
                      disabled
                      label="Email"
                      onBlur={(e) => handleChange(e, 'email')}
                      onChange={(e) => setState({ email: e.target.value })}
                      value={userProfile.email ? userProfile.email : ''}
                      variant={variant}
                      size="small"
                    />
                    <small>Email will not be publicly displayed</small>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridCounry">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Country</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <Select
                      labelId="country-simple-select"
                      id="country-simple-select"
                      className="w-100"
                      variant={variant}
                      onChange={(e) => handleChange(e, 'country')}
                      value={userProfile.country && userProfile.country.name ? userProfile.country.name : ''}
                      size="small"
                    >
                      {countries.map(({ name, id }) => (
                        <MenuItem key={name} id={id} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridCurrency">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Currency</InputLabel>
                  </Col>
                  <Col lg={2}>
                    <Select
                      labelId="currency-simple-select"
                      id="currency-simple-select"
                      className="w-100"
                      variant={variant}
                      value={userProfile.currency && userProfile.currency.code ? userProfile.currency.code : ''}
                      onChange={(e) => handleChange(e, 'currency')}
                      size="small"
                    >
                      {currencies.map(({ code, id }) => (
                        <MenuItem key={id} id={id} value={code}>
                          {code}
                        </MenuItem>
                      ))}
                    </Select>
                  </Col>
                  <Col lg={3}>
                    <small>
                      <p className="mb-0 mt-3">Select your currency base</p>
                    </small>
                  </Col>
                </Form.Group>
                <div className="separator separator-dashed my-3" />

                <InputLabel className="font-weight-bold my-7 h2">Change Password</InputLabel>

                <Form.Group as={Row} controlId="formGridCurrPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Current Password</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      label="Current Password"
                      className="w-100"
                      variant={variant}
                      onChange={(e) => setState({ currentPassword: e.target.value })}
                      size="small"
                    />
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                      }}
                      style={{ color: '#3783e7' }}
                    >
                      Forget Password?
                    </a>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridNewPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">New Password</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      label="New Password"
                      className="w-100"
                      variant={variant}
                      onChange={(e) => setState({ newPassword: e.target.value })}
                      size="small"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridVerifyPassword">
                  <Col lg={3}>
                    <InputLabel className="font-weight-bold mt-7 ml-5 d-none d-sm-block">Verify Password</InputLabel>
                  </Col>
                  <Col lg={6}>
                    <TextField
                      type="password"
                      className="w-100"
                      label="Verify Password"
                      variant={variant}
                      onChange={(e) => setState({ verifyPassword: e.target.value })}
                      size="small"
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formGridPassword">
                  <Col lg={9}>
                    <Button
                      variant="contained"
                      color="secondary"
                      // className={(classes.button += ' h-100 float-right')}
                      style={{
                        textTransform: 'none'
                      }}
                      disabled={changePasswordIsDisabled()}
                      onClick={(e) => handleChange(e, 'newPassword')}
                      size="small"
                    >
                      Change Password
                    </Button>
                  </Col>
                </Form.Group>
              </div>
            </div>
          </div>
        </Row>
      </Card>
    </Grid>
  )
}

export default Settings
