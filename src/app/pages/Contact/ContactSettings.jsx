/**
*
*  Settings displayed on the Contact record
* 
*   TODO: check if make sense the avatar here, because the contact is linked to the user, so we can use the picture in the contacts
*   <Form.Group as={Row} controlId="formGridAvatar"> </Form.Group> 
*
*/

/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {
  useEffect,
  useState,
} from 'react'
import {
  Grid,
  TextField,
  InputLabel,
  Button,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  Select,
} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {getAllCountries} from '../Country/countryActions'
import {getUserProfile, updateProfile } from '../../actions/userActions'
import {toAbsoluteUrl} from '../../../_metronic/_helpers'
import {getAllCurrencies} from '../../actions/currencyActions'
import CustomizedSnackbars from '../../utils/snackbar'

const Settings = () => {
  const auth = useSelector((state) => state.auth)

/** const classes = {
*  inputRoot: {
*     flexWrap: 'wrap',
*   },
*   inputInput: {
*     width: 'auto',
*     flexGrow: 1,
*   },
* }
*/
  const [currencies, setCurrencies] = useState([])
  const [countries, setCountries] = useState([])
  const [userProfile, setUserProfile] = useState({
    avatar_url: toAbsoluteUrl('/media/logos/flow-logo.svg'),
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
            variant: 'success',
          })
          setState(res.data.data[0])
        }
      })
      .catch((err) => {
        setSnackState({
          message: err.message,
          open: true,
          variant: 'error',
        })
      })
  }

  const [snackState, _setSnackState] = useState({
    message: '',
    variant: 'success',
    open: false,
  })

  // TODO: Create a theme to save the global variables.
  const variant = 'outlined'

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState })
  }

  // const onFileChange = (e) => {
  //   const file = e.target && e.target.files && e.target.files[0] ? e.target.files[0] : ''
  //   updateProfile(
  //     auth,
  //     {
  //       avatar: file,
  //     },
  //     file && file.name ? file.name : false,
  //   )
  //     .then((res) => {
  //       if (res.data && res.data.success) {
  //         setSnackState({
  //           message: 'Saved!',
  //           open: true,
  //           variant: 'success',
  //         })
  //         setState({
  //           avatar_url: res.data.data[0].avatar_url,
  //         })
  //       }
  //     })
  //     .catch((err) => {
  //       setSnackState({
  //         message: err.message,
  //         open: true,
  //         variant: 'error',
  //       })
  //     })
  // }



  return (

    <Grid 
    container
    direction="column"
    spacing={2}
    alignContent="space-around"
    alignItems="stretch"
    >

      <CardHeader
        title="Settings"
        subheader="Update your account and settings"
      />

<CustomizedSnackbars
  {...snackState}
  setSnackState={setSnackState}
  handleClose={() => {
  setSnackState({ open: false })
  }}
/>
      
    {/* Personal Information */}
      <Grid item xs={12}> 
        <Card>
          <CardHeader title="Personal Information" />
          <CardContent>

            {/* name */}
            <InputLabel>
              Name
            <TextField
              type="text"
              InputLabelProps={{shrink: false}}
              label=""
              variant={variant}
              onBlur={(e) => handleChange(e, 'name')}
              onChange={(e) => setState({ name: e.target.value })}
              value={userProfile.name ? userProfile.name : ''}
              size="small"
            />
            </InputLabel>

              {/* surname */}
            <InputLabel>
              Surname
            <TextField
              type="text"
              InputLabelProps={{shrink: false}}
              variant={variant}
              onBlur={(e) => handleChange(e, 'surname')}
              onChange={(e) => setState({ surname: e.target.value })}
              value={userProfile.surname ? userProfile.surname : ''}
              size="small"
            />
            </InputLabel>

            {/* dob */}
            <InputLabel>
              Date of Birth
            <TextField
              type="date"
              InputLabelProps={{shrink: false}}
              label=""
              variant={variant}
              value={userProfile.dob ? userProfile.dob : ''}
              onChange={(e) => setState({ dob: e.target.value })}
              onBlur={(e) => handleChange(e, 'dob')}
              size="small"
              />
                  Date of Birth will not be publicly displayed
                  Will be use to calculate you FI
            </InputLabel>
           </CardContent>
        </Card>
      </Grid>

      {/* Account Information */}
      <Grid item xs={12}> 
        <Card>
          <CardHeader title="Account Information" />
          <CardContent>

            {/* username */}
            <InputLabel>
              Username
           
            <TextField
              label=""
              value={userProfile.username ? userProfile.username : ''}
              disabled
              onChange={(e) => setState({ username: e.target.value })}
              onBlur={(e) => handleChange(e, 'username')}
              variant={variant}
              size="small"
            />
            </InputLabel>

            {/* email */}
            <InputLabel>
              Email
            <TextField
              type="email"
              disabled
              label=""
              onBlur={(e) => handleChange(e, 'email')}
              onChange={(e) => setState({ email: e.target.value })}
              value={userProfile.email ? userProfile.email : ''}
              variant={variant}
              size="small"
            />
            Email will not be publicly displayed
            </InputLabel>

            {/* country */}
            <InputLabel>
              Country
         
            <Select
              labelId="country-simple-select"
              id="country-simple-select"
              variant={variant}
              onChange={(e) => handleChange(e, 'country')}
              value={
                userProfile.country && userProfile.country.name
                  ? userProfile.country.name
                  : ''
              }
              size="small"
            >
              {countries.map(({ name, id }) => (
                <MenuItem key={name} id={id} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            </InputLabel>

            {/* currency */}
            <InputLabel>
              Currency
           
            <Select
              labelId="currency-simple-select"
              id="currency-simple-select"
              variant={variant}
              size="small"
              value={
                userProfile.currency && userProfile.currency.code
                  ? userProfile.currency.code
                  : ''
              }
              onChange={(e) => handleChange(e, 'currency')}

            >
              {currencies.map(({ code, id }) => (
                <MenuItem key={id} id={id} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Select>
            Select your currency base
            </InputLabel>
 
          </CardContent>
        </Card>
      </Grid>

      {/* Change Password */}
      {/* @todo: make the change password work, yup validations, password match, etc. */}
      <Grid item xs={12}> 
        <Card>
        <CardHeader title="Change Password" />
        <CardContent>
          <InputLabel>
            Current Password
         
            <TextField
              type="password"
              label=""
              variant={variant}
              onChange={(e) => setState({ currentPassword: e.target.value })}
              size="small"
            />
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
              }}
              >
              Forget Password?
            </a>
            </InputLabel>
            
            {/* @todo: disable popup autofill password / trigger the new password suggestion  */}
            <InputLabel>
              New Password
            <TextField
              type="password"
              label=""
              variant={variant}
              onChange={(e) => setState({ newPassword: e.target.value })}
              size="small"
            />
           </InputLabel>

            {/* @todo: disable popup autofill password / trigger the new password suggestion  */}
            <InputLabel margin="dense">
              Verify Password
            <TextField
              type="password"
              label=""
              variant={variant}
              onChange={(e) => setState({ verifyPassword: e.target.value })}
              size="small"
            />
                
            <Button
              size="small"
              style={{
                textTransform: 'none',
              }}
              disabled={changePasswordIsDisabled()}
              onClick={(e) => handleChange(e, 'newPassword')}
            >
              Change Password
            </Button>
            </InputLabel>
          </CardContent>
        </Card>
      </Grid> 

     </Grid> 
  )
}

export default Settings
