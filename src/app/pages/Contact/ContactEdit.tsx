import {
  Button,
  createStyles,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Theme,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as contactsActions from './state/contactsActions'
import * as countriesActions from '../Country/state/countriesActions'
import { RootState } from '../../../redux/rootReducer'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
export const ContactEdit = (props: any) => {
  const { selectedContact, handleClose, handleOpen } = props
  const { countryState, authState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
      authState: state.auth,
    }),
    shallowEqual
  )
  const [formData, setFormData] = useState(null as any)
  const [params, SetParams] = useState('' as any)
  const [visibility, setVisibility] = useState(selectedContact.attributes.visibility)
  const [kind, setKind] = useState(selectedContact.attributes.kind)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [canPublic, setCanPublic] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  let EditContactSchema 
  if (kind === 'Individual') {
    EditContactSchema = Yup.object().shape({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name should be at-least 3 characters.')
        .max(50, 'Name should be less than 50 characters'),
    })
  } else {
    EditContactSchema = Yup.object().shape({
      trade_name: Yup.string()
        .required('Trade name is required')
        .min(3, 'Trade name should be at-least 3 characters.')
        .max(50, 'Trade name should be less than 50 characters'),
    })
  }
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(EditContactSchema),
  })
  // funcion que enche os formularios cos datos a editar
  useEffect(() => {
    setKind(selectedContact?.attributes.kind)
    setCountry(selectedContact?.attributes.country.id)
    setVisibility(selectedContact?.attributes.visibility)
  }, [selectedContact])
  // funcion que garda un boolean que indica se o user actual pode editar ou borrar o contact actual
  useEffect(() => {
    if (authState.role !== 'user') {
      setCanPublic(true)
    } else setCanPublic(false)
  }, [authState])
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: 5,
        width: '420px',
      },
      datePicker: {
        width: '200px',
      },
    })
  )
  // garda o id do country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }

  // peticion da lista de countries
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(countriesActions.fetchCountries())
  }, [dispatch])
  // recibida resposta actualiza a lista
  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      setList(countryState.countryTable.entities)
      setIsLoading(countryState.listLoading)
      setCountry(selectedContact.attributes.country.id)
    }
  }, [countryState, selectedContact.attributes.country.id])
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(selectedContact.id)
    data = { ...data, kind: kind, country_id: country, visibility: visibility }
    if (kind === 'Individual') {
      data = { ...data, trade_name: null, company_name: null, founded: null }
    } else {
      data = { ...data, name: null, surname: null, nick: null, dob: null }
    }
    setFormData(data)
    handleClose()
  }
  // chamada a accion de updateContact cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.updateContact(formData, params))
    }
  }, [formData, dispatch, params])
  // garda na variable kind o radiobutton marcado
  const handleKind = (e: any) => {
    setKind(e.target.value)
  }
  // garda na variable visibility o radiobutton marcado
  const handleVisibility = (e: any) => {
    setVisibility(e.target.value)
  }
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <Grid container direction="column">
        {canPublic && (
          <FormControl margin="normal">
            <FormLabel>Select Visibility</FormLabel>
            <RadioGroup name="visibility" value={visibility} onChange={handleVisibility}>
              <Grid container>
                <FormControlLabel value="Public" control={<Radio color="default" />} label="Public" />
                <FormControlLabel value="Private" control={<Radio color="default" />} label="Private" />
              </Grid>
            </RadioGroup>
          </FormControl>
        )}

        {/* contact type */}
        <FormControl margin="normal">
          <FormLabel>Select Contact Type</FormLabel>
          <RadioGroup name="kind" value={kind} onChange={handleKind}>
            <Grid container>
              <FormControlLabel value="Company" control={<Radio color="default" />} label="Company" />
              <FormControlLabel value="Individual" control={<Radio color="default" />} label="Individual" />
            </Grid>
          </RadioGroup>
        </FormControl>

        {/* country */}
        <FormControl margin="normal">
          <FormLabel>Select Country</FormLabel>
          {!isLoading ? (
            <TextField value={country} onChange={handleCountry} inputRef={register} select name="Country">
              {list.map((country: any) => (
                <MenuItem value={country.id} key={country.id}>
                  {country.attributes.name}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <LinearProgress />
          )}
        </FormControl>

        {kind === 'Company' ? (
          <>
            {/* trade name */}
            <FormControl margin="dense">
              <FormLabel>Trade Name</FormLabel>
              <TextField
                name="trade_name"
                defaultValue={selectedContact.attributes.trade_name}
                placeholder="Trade Name"
                autoComplete="off"
                inputRef={register()}
              />
            {errors.trade_name && <Alert severity="error">{errors.trade_name.message}</Alert>}
            </FormControl>

            {/* company name */}
            <FormControl margin="dense">
              <FormLabel>Company Name</FormLabel>
              <TextField
                name="company_name"
                autoComplete="off"
                defaultValue={selectedContact.attributes.company_name}
                placeholder="Company name"
                inputRef={register()}
              />
            </FormControl>

            {/* company number */}
            <FormControl margin="dense">
              <FormLabel>Company Number</FormLabel>
              <TextField
                name="id_number"
                defaultValue={selectedContact.attributes.id_number}
                placeholder="Company Number"
                inputRef={register()}
              />
            </FormControl>

            {/* founded */}
            <FormControl margin="dense">
              <FormLabel>Founded</FormLabel>
              <TextField
                name="founded"
                type="date"
                autoComplete="off"
                defaultValue={selectedContact.attributes.founded}
                inputRef={register()}
                className={classes.datePicker}
              />
            </FormControl>
          </>
        ) : (
          <>
            {/* name */}
            <FormControl margin="dense">
              <FormLabel>Name</FormLabel>
              <TextField
                name="name"
                placeholder="Name"
                defaultValue={selectedContact.attributes.name}
                autoComplete="off"
                inputRef={register()}
              />
              {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
            </FormControl>
            {/* surname */}
            <FormControl margin="dense">
              <FormLabel>Surname</FormLabel>
              <TextField
                name="surname"
                // label="Surname"
                autoComplete="off"
                defaultValue={selectedContact.attributes.surname}
                placeholder="Surname"
                inputRef={register()}
              />
            </FormControl>
            {/* nick */}
            <FormControl margin="dense">
              <FormLabel>Nick</FormLabel>
              <TextField
                name="nick"
                // label="Nick"
                autoComplete="off"
                defaultValue={selectedContact.attributes.nick}
                placeholder="Nick"
                inputRef={register()}
              />
            </FormControl>
            {/* id number */}
            <FormControl margin="dense">
              <FormLabel>ID Number</FormLabel>
              <TextField
                name="id_number"
                // label="ID Number"
                defaultValue={selectedContact.attributes.id_number}
                placeholder="ID Number"
                inputRef={register()}
              />
            </FormControl>
            {/* dob */}
            <FormControl margin="dense">
              <FormLabel>Date of Bird</FormLabel>
              <TextField
                name="dob"
                type="date"
                autoComplete="off"
                defaultValue={selectedContact.attributes.dob}
                inputRef={register()}
                className={classes.datePicker}
              />
            </FormControl>
          </>
        )}

        {/* description */}
        <FormControl margin="dense">
          <FormLabel>Description</FormLabel>
          <TextField
            inputRef={register()}
            defaultValue={selectedContact.attributes.description}
            name="description"
            // label="description"
            multiline
            placeholder="Description"
          />
        </FormControl>

        <Grid container justify="space-between">
          <Grid item>
            <Button onClick={(e) => handleOpen(e, 'delete')} color="secondary">
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
