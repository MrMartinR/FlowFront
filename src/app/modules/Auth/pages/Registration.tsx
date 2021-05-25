import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import * as authActions from '../state/authActions'
import { useForm } from 'react-hook-form'
import Logo from '../../../../common/media/flow-logo.svg'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Grid, Typography, CardMedia, FormControl, Select, MenuItem, Modal, Card } from '@material-ui/core'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'
import { countriesList } from '../data/Countries'
import { terms, terms2, terms3, terms4, terms5, terms6 } from '../data/terms'
const initialValues = {
  fullname: '',
  email: '',
  username: '',
  name: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

type RegisterType = {
  email: string
  fullname: string
  username: string
  password: string
  name: string
}

/**
 * User registration component
 * @author Zeeshan A
 */
export const Registration = () => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const RegistrationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    password: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    acceptTerms: Yup.bool()
      .required('You must accept the terms and conditions'),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(RegistrationSchema),
    defaultValues: initialValues,
  })
  const dispatch =  useDispatch();
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.auth,
    }),
    shallowEqual
  )
  const [country, setCountry] = useState('61c2888b-8b6a-4536-830f-3a14e86a9cd5');
  const handleCountry = (e: any) => {
    setCountry(e.target.value);
  }

  useEffect( () => {
    setLoading(currentState.loading);
  }, [currentState.loading]);
  const onSubmit = ({ email, username, password, name }: RegisterType) => {
    dispatch(authActions.registration(email, name, username, password, country));
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <Card style = {{ width : '80vh', maxHeight: '40vh', margin: 'auto', marginTop: '30vh', background: 'white', overflowY:'scroll', textAlign:'justify', padding:'20px' }}>
      <Typography paragraph variant='h6'>Terms and conditions</Typography>
      <Typography paragraph variant='body2'>{ terms }</Typography>
      <Typography paragraph variant='body2'>{ terms2 }</Typography>
      <Typography paragraph variant='body2'>{ terms3 }</Typography>
      <Typography paragraph variant='body2'>{ terms4 }</Typography>
      <Typography paragraph variant='body2'>{ terms5 }</Typography>
      <Typography paragraph variant='body2'>{ terms6 }</Typography>
      <Button variant = 'contained' fullWidth onClick = { handleClose }>Close</Button>
    </Card>
  );
  return (
    <Grid container direction="column" justify="space-around" alignItems="center">
      {/* logo */}
      <Grid item xs="auto">
        <CardMedia src={Logo} component="img" />
        <Typography align="center" variant="h6">
          Become a Flower!"
        </Typography>
      </Grid>
      {/* form */}
      <Grid item xs="auto">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
          <Grid container direction="column" justify="center" alignItems="center">
            {/* begin: Email */}
            <FormControl variant="filled" style = {{ width: '100%' }}>
              <TextField
                id="outlined-uncontrolled"
                label="Email"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="email"
                name="email"
                inputRef={register()}
              />
              <span> {errors.email && errors.email.message}</span>
            </FormControl>
            {/* end: Email */}

            {/* begin: Password */}
            <FormControl variant="filled" style = {{ width: '100%' }}>
              <TextField
                id="outlined-uncontrolled"
                label="Password"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="password"
                name="password"
                inputRef={register()}
              />
              <span> {errors.password && errors.password.message}</span>
            </FormControl>

            {/* end: Password */}

            {/* begin: Username */}
            <FormControl variant="filled" style = {{ width: '100%' }}>
              <TextField
                id="outlined-uncontrolled"
                label="Username"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="text"
                name="username"
                inputRef={register()}
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Country */}
            <FormControl variant = "outlined" margin = 'normal' style = {{ width: '100%' }}>
              <Select labelId="Country" id="country" value = { country } onChange = { handleCountry }>
                  {countriesList.map((country:any) => (
                    <MenuItem 
                      value= { country.id }
                      key = { country.id }>{ country.name }</MenuItem>
                  ))}  
              </Select>
            </FormControl>
            {/* end: Country */}

            {/* begin: Name */}
            <FormControl variant="filled" style = {{ width: '100%' }}>
              <TextField
                id="outlined-uncontrolled"
                label="Name"
                margin="normal"
                variant="outlined"
                autoComplete="true"
                type="text"
                name="name"
                inputRef={register()}
              />
              <span> {errors.username && errors.username.message}</span>
            </FormControl>
            {/* end: Username */}

            {/* begin: Terms and Conditions */}
            <FormControl variant="filled">
              <label htmlFor="acceptTerms" className="checkbox">
                <input type="checkbox" name="acceptTerms" id="acceptTerms" ref={register()} />{' '}
                <Button variant='text' onClick = { handleOpen }>
                  I accept the Terms & Conditions.
                </Button>
              </label>
              <span> {errors.acceptTerms && errors.acceptTerms.message}</span>
            </FormControl>
            <Modal
              open={open}
              onClose={handleClose}
            >
              {body}
          </Modal>
            {/* end: Terms and Conditions */}
            <FormControl variant="filled" margin = 'normal'>
              <Button type="submit" variant = 'contained' color = 'secondary'>
                <span>Sign Up</span>
                {loading && <span className="ml-3 spinner spinner-white" />}
              </Button>
              <Button href = "/auth/login" type="button" variant = 'text'>
                Cancel
              </Button>
            </FormControl>
          </Grid>
        </form>
      </Grid>
    </Grid>
  )
}
