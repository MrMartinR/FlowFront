import {
  Button,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  LinearProgress,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as loansActions from './../state/loansActions'
import { Alert } from '@material-ui/lab'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as countriesActions from '../../Country/state/countriesActions'
import * as currenciesActions from '../../Currency/state/currenciesActions'
import { RootState } from '../../../../redux/rootReducer'
import { statusTypes } from '../../../utils/types'

export const LoanEdit = (props: any) => {
  const { loanDetails, handleClose, handleOpen } = props
  const [params, SetParams] = useState('' as any)
  const [formData, setFormData] = useState(null as any)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [currency, setCurrency] = useState('')
  const [currencyList, setCurrencyList] = useState([] as any)
  const [currencyLoading, setCurrencyLoading] = useState(true)
  const [status, setStatus] = useState('')

  const { countryState, currencyState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
      currencyState: state.currencies,
    }),
    shallowEqual
  )
  const EditLoanSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').min(3, 'Name should be at least 3 characters.'),
  })
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(EditLoanSchema),
  })
  const dispatch = useDispatch()
  // Funcion que prepara os datos do formulario para enviar
  const onSubmit = (data: any, e: any) => {
    SetParams(loanDetails.id)
    const form = {
      ...data,
      currency_id: currency,
      country_id: country,
      status,
    }
    setFormData(form)
    handleClose()
  }
  // chamada a accion de updateContact cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(loansActions.updateLoan(formData, params))
    }
  }, [formData, dispatch, params])
  // peticion da lista de countries
  useEffect(() => {
    dispatch(countriesActions.fetchCountries())
    dispatch(currenciesActions.getAllCurrencies())
  }, [dispatch])
  // recibida a resposta actualiza as listas
  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      if (countryState.error === null) {
        setList(countryState.countryTable.entities)
        setIsLoading(countryState.listLoading)
        setCountry(loanDetails.attributes.country.id)
      } else {
        alert(countryState.error)
      }
    }
  }, [countryState, loanDetails])
  // funcion que garda o id co country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  useEffect(() => {
    if (loanDetails !== null) {
      setStatus(loanDetails.attributes.status)
    }
  }, [loanDetails])
  // recibida a resposta actualiza as listas
  useEffect(() => {
    if (currencyState && currencyState.currenciesTable && currencyState.currenciesTable.entities) {
      if (currencyState.error === null) {
        setCurrencyList(currencyState.currenciesTable.entities)
        setCurrencyLoading(currencyState.listLoading)
        setCurrency(loanDetails.attributes.currency.id)
      } else {
        alert(currencyState.error)
      }
    }
  }, [currencyState, loanDetails])
  // funcion que garda o id co currency seleccionado
  const handleCurrency = (e: any) => {
    setCurrency(e.target.value)
  }

  // funcion que garda o status seleccionado
  const handleStatus = (e: any) => {
    setStatus(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column">
        <Typography variant="h5">Edit Loan</Typography>
        {/* name */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Name</FormLabel>
          <TextField
            name="name"
            defaultValue={loanDetails.attributes.name}
            placeholder="Name"
            autoComplete="off"
            inputRef={register()}
          />
          {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
        </FormControl>
        {/* code */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Code</FormLabel>
          <TextField
            name="code"
            defaultValue={loanDetails.attributes.code}
            placeholder="Code"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* rating */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Rating</FormLabel>
          <TextField
            name="rating"
            defaultValue={loanDetails.attributes.rating}
            placeholder="Rating"
            autoComplete="off"
            inputRef={register()}
          />
        </FormControl>
        {/* status */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Status</FormLabel>
          <TextField value={status} onChange={handleStatus} select variant="outlined">
            {statusTypes.map((sta: any) => (
              <MenuItem value={sta.value} key={sta.value}>
                {sta.value}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
        {/* country */}
        <FormControl margin="dense">
          <FormLabel>Country</FormLabel>
          {!isLoading ? (
            <TextField select variant="outlined" value={country} onChange={handleCountry}>
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
        {/* currency */}
        <FormControl margin="dense">
          <FormLabel>Currency</FormLabel>
          {!currencyLoading ? (
            <TextField select variant="outlined" value={currency} onChange={handleCurrency}>
              {currencyList.map((currency: any) => (
                <MenuItem value={currency.id} key={currency.id}>
                  {currency.attributes.name}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <LinearProgress />
          )}
        </FormControl>
        {/* link */}
        <FormControl fullWidth margin="dense">
          <FormLabel>Link</FormLabel>
          <TextField
            name="link"
            defaultValue={loanDetails.attributes.link}
            placeholder="Link"
            autoComplete="off"
            inputRef={register()}
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
