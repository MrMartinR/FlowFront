import { useState } from 'react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import Logo from '../../../../common/media/flow-logo.svg'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  Typography,
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  Modal,
  Card,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { countriesList } from '../data/countries'
import { terms, terms2, terms3, terms4, terms5, terms6 } from '../data/terms'

/* initializing values */
const initialValues = {
  email: '',
  username: '',
  name: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

/* types */
type RegisterType = {
  email: string
  username: string
  password: string
  name: string
}

/* styles */
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #f2f2f2 25%, #ccc 90%)',
    minWidth: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

/* User registration component */
export const Registration = () => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(6, 'Minimum 6 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
    name: Yup.string().min(3, 'Minimum 3 characters').max(50, 'Maximum 50 characters').required('Required'),
    acceptTerms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(RegistrationSchema),
    defaultValues: initialValues,
  })
  const dispatch = useDispatch()
  const [country, setCountry] = useState('61c2888b-8b6a-4536-830f-3a14e86a9cd5')
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }

  const onSubmit = ({ email, username, password, name }: RegisterType) => {
    dispatch(authActions.registration(email, name, username, password, country))
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <Card
      style={{
        width: '80vh',
        maxHeight: '40vh',
        margin: 'auto',
        marginTop: '30vh',
        background: 'white',
        overflowY: 'scroll',
        textAlign: 'justify',
        padding: '20px',
      }}
    >
      <Typography paragraph variant="h6">
        Terms and conditions
      </Typography>
      <Typography paragraph variant="body2">
        {terms}
      </Typography>
      <Typography paragraph variant="body2">
        {terms2}
      </Typography>
      <Typography paragraph variant="body2">
        {terms3}
      </Typography>
      <Typography paragraph variant="body2">
        {terms4}
      </Typography>
      <Typography paragraph variant="body2">
        {terms5}
      </Typography>
      <Typography paragraph variant="body2">
        {terms6}
      </Typography>
      <Button variant="contained" fullWidth onClick={handleClose}>
        Close
      </Button>
    </Card>
  )
  return (
    <Grid container className={classes.root}>
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Registration
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Country */}
            <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
              <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
                {countriesList.map((country: any) => (
                  <MenuItem value={country.id} key={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* end: Country */}

            {/* begin: Name */}
            <FormControl variant="filled" style={{ width: '100%' }}>
              <TextField
                id="name"
                label="Name"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="text"
                name="name"
                required
                inputRef={register()}
              />
              <span> {errors.name && errors.name.message}</span>
            </FormControl>
            {/* end: Name */}

            {/* begin: Email */}
            <FormControl variant="filled" style={{ width: '100%' }}>
              <TextField
                id="email"
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="email"
                name="email"
                required
                inputRef={register()}
              />
              <span> {errors.email && errors.email.message}</span>
            </FormControl>
            {/* end: Email */}

            {/* begin: Username */}
            <FormControl variant="filled" style={{ width: '100%' }}>
              <TextField
                id="username"
                label="Username"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="text"
                name="username"
                required
                inputRef={register()}
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Password */}
            <FormControl variant="filled" style={{ width: '100%' }}>
              <TextField
                id="password"
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="false"
                type="password"
                name="password"
                required
                inputRef={register()}
              />
              <span> {errors.password && errors.password.message}</span>
            </FormControl>
            {/* end: Password */}

            {/* begin: Terms and Conditions */}
            <FormControl variant="filled">
              <label htmlFor="acceptTerms" className="checkbox">
                <Typography variant="body2">
                  <input type="checkbox" name="acceptTerms" id="acceptTerms" ref={register()} />I accept the
                  <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleOpen}>
                    Terms & Conditions.
                  </span>
                </Typography>
              </label>
              <span> {errors.acceptTerms && errors.acceptTerms.message}</span>
              <br />
              <Button type="submit" variant="contained" color="secondary">
                <span>Sign Up</span>
              </Button>
              <Typography variant="body2" align="center">
                Already registered? <Link to="/auth/login">Sign in</Link>
              </Typography>
            </FormControl>
            <Modal open={open} onClose={handleClose}>
              {body}
            </Modal>
            {/* end: Terms and Conditions */}
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
