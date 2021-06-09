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
  Select,
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

export const ContactEdit = (props: any) => {
  const { selectedContact, handleClose, handleOpen } = props
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
  // funcion que enche os formularios cos datos a editar
  useEffect(() => {
    setKind(selectedContact?.attributes.kind)
    setCountry(selectedContact?.attributes.country.id)
    setVisibility(selectedContact?.attributes.visibility)
  }, [selectedContact])

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
  const handleKind = (e:any) => {
    setKind(e.target.value)
  }
  // garda na variable visibility o radiobutton marcado
  const handleVisibility = (e:any) => {
    setVisibility(e.target.value)
  }
  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <FormControl margin='normal'>
          <FormLabel>Select Contact Type</FormLabel>
          <RadioGroup name="kind" value={kind} onChange={handleKind}>
            <Grid container>
              <FormControlLabel value="Company" control={<Radio />} label="Company" />
              <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
            </Grid>
          </RadioGroup>
        </FormControl>
        <FormControl margin='normal'>
          <FormLabel>Select Country</FormLabel>
          {!isLoading ? (
            <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
              {list.map((country: any) => (
                <MenuItem value={country.id} key={country.id}>
                  {country.attributes.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <LinearProgress />
          )}

        </FormControl>
        <FormControl margin='normal'>
          <FormLabel>Select Visibility</FormLabel>
          <RadioGroup name="visibility" value={visibility} onChange={handleVisibility}>
            <Grid container>
              <FormControlLabel value="Public" control={<Radio />} label="Public" />
              <FormControlLabel value="Private" control={<Radio />} label="Private" />
            </Grid>
          </RadioGroup>
        </FormControl>

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
            {errors.trade_name && errors.trade_name.type === 'required' && (
              <Alert severity="error">Trade name is required</Alert>
            )}
            {errors.trade_name && errors.trade_name.type === 'minLength' && (
              <Alert severity="error">Trade name should be at-least 3 characters.</Alert>
            )}
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
              type="date"
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
            {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
            {errors.name && errors.name.type === 'minLength' && (
              <Alert severity="error">Name should be at-least 3 characters.</Alert>
            )}
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
        <TextField
          name="description"
          label='description'
          variant="outlined"
          defaultValue={selectedContact.attributes.description}
          multiline
          placeholder="Description"
          inputRef={register({ required: false })}
          className={classes.root}
        />

        <Grid container justify="space-between">
          <Grid item>
            <Button color="secondary" onClick={(e) => handleOpen(e, 'delete')}>
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant='contained'>
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
