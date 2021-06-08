import {
  Button,
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  LinearProgress,
  makeStyles,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'

import { Alert } from '@material-ui/lab'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as contactsActions from './state/contactsActions'
import * as countriesActions from '../Country/state/countriesActions'
import { RootState } from '../../../redux/rootReducer'

export const ContactEdit = (props: any) => {
  const { selectedContact, handleClose } = props
  const { countryState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
    }),
    shallowEqual
  )
  const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [params, SetParams] = useState('' as any)
  const [visibility, setVisibility] = useState(selectedContact.attributes.visibility)
  const [kind, setKind] = useState(selectedContact.attributes.kind)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [checkState, setCheckState] = useState({
    checkedA: false,
    checkedB: false,
  })
  const [checkVisible, setCheckVisible] = useState({
    checkedC: false,
    checkedD: false,
  })
  const [description, setDescription] = useState(selectedContact.attributes.description)
  // funcion que enche os formularios cos datos a editar
  useEffect(() => {
    if (selectedContact?.attributes.kind === 'Company')
      setCheckState({
        checkedA: true,
        checkedB: false,
      })
    if (selectedContact?.attributes.kind === 'Individual')
      setCheckState({
        checkedA: false,
        checkedB: true,
      })
    setCountry(selectedContact?.attributes.country.id)
    if (selectedContact?.attributes.visibility === 'Private')
      setCheckVisible({
        checkedC: true,
        checkedD: false,
      })
    if (selectedContact?.attributes.visibility === 'Public')
      setCheckVisible({
        checkedC: false,
        checkedD: true,
      })
  }, [selectedContact])

  // actualizacion da variable decription cos datos do textArea
  const handleChange = (e: any) => {
    setDescription(e.target.value)
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        margin: 5,
      },
    })
  )
  // garda o id do country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  // garda o checkbox seleccionado
  const handleKind = (e: any) => {
    if (e.target.name === 'checkedA') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedB']: false,
      })
    }
    if (e.target.name === 'checkedB') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedA']: false,
      })
    }
    if (e.target.name === 'checkedC') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedD']: false,
      })
    }
    if (e.target.name === 'checkedD') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedC']: false,
      })
    }
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
    data = { ...data, kind: kind, country_id: country, visibility: visibility, description: description }
    setFormData(data)
    handleClose()
  }
  // chamada a accion de updateContact cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.updateContact(formData, params))
    }
  }, [formData, dispatch, params])
  // actualizacion da variable kind coa información dos checkboxes
  useEffect(() => {
    if (checkState.checkedA === true) {
      setKind('Company')
    }
    if (checkState.checkedB === true) {
      setKind('Individual')
    }
  }, [checkState])
  // actualizacion da variable visibility coa información dos checkboxes
  useEffect(() => {
    if (checkVisible.checkedC === true) {
      setVisibility('Private')
    }
    if (checkVisible.checkedD === true) {
      setVisibility('Public')
    }
  }, [checkVisible])
  const classes = useStyles()
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction="column">
          <Typography variant="body1">Select Contact Type</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkState.checkedA} name="checkedA" onChange={handleKind} />}
              label="Company"
            />
            <FormControlLabel
              control={<Checkbox checked={checkState.checkedB} onChange={handleKind} name="checkedB" />}
              label="Individual"
            />
          </FormGroup>
          <hr />
          <Typography variant="body1">Select Country</Typography>
          {!isLoading ? (
            <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
              {list.map((country: any) => (
                <MenuItem value={country.id} key={country.id}>
                  {country.attributes.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <LinearProgress color="secondary" />
          )}
          <hr />
          <Typography variant="body1">Select Visibility</Typography>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedC} name="checkedC" onChange={handleKind} />}
              label="Private"
            />
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedD} onChange={handleKind} name="checkedD" />}
              label="Public"
            />
          </FormGroup>

          {kind === 'Company' ? (
            <>
              <TextField
                name="trade_name"
                label="Trade_name"
                variant="outlined"
                defaultValue={selectedContact.attributes.trade_name}
                placeholder="Trade name"
                autoComplete="off"
                inputRef={register({ required: true, minLength: 3 })}
                className={classes.root}
              />
              <TextField
                name="company_name"
                label="Company name"
                variant="outlined"
                autoComplete="off"
                defaultValue={selectedContact.attributes.company_name}
                placeholder="Company name"
                inputRef={register({ required: false })}
                className={classes.root}
              />
              <FormLabel>Founded</FormLabel>
              <TextField
                name="founded"
                type='date'
                variant="outlined"
                autoComplete="off"
                defaultValue={selectedContact.attributes.founded}
                inputRef={register({ required: false })}
                className={classes.root}
              />
            </>
          ) : (
            <>
              <TextField
                name="name"
                label="Name"
                variant="outlined"
                placeholder="Name"
                defaultValue={selectedContact.attributes.name}
                autoComplete="off"
                inputRef={register({ required: true, minLength: 3 })}
                className={classes.root}
              />
              <TextField
                name="surname"
                label="surname"
                variant="outlined"
                autoComplete="off"
                defaultValue={selectedContact.attributes.surname}
                placeholder="Surname"
                inputRef={register({ required: false })}
                className={classes.root}
              />
              <TextField
                name="nick"
                label="nick"
                variant="outlined"
                autoComplete="off"
                defaultValue={selectedContact.attributes.nick}
                placeholder="Nick"
                inputRef={register({ required: false })}
                className={classes.root}
              />
            </>
          )}
          <TextField
            name="id_number"
            label="id_number"
            variant="outlined"
            defaultValue={selectedContact.attributes.id_number}
            placeholder="ID Number"
            inputRef={register({ required: false })}
            className={classes.root}
          />
          <TextareaAutosize
            name="description"
            rowsMin={5}
            value={description}
            placeholder="Description"
            onChange={handleChange}
            className={classes.root}
          />
          {errors.trade_name && errors.trade_name.type === 'required' && (
            <Alert severity="error">Trade name is required</Alert>
          )}
          {errors.trade_name && errors.trade_name.type === 'minLength' && (
            <Alert severity="error">Trade name should be at-least 3 characters.</Alert>
          )}
          {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
          {errors.name && errors.name.type === 'minLength' && (
            <Alert severity="error">Name should be at-least 3 characters.</Alert>
          )}

          <Grid container justify="space-between">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}
