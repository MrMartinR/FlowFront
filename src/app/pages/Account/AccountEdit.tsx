import { Button, Grid, LinearProgress, MenuItem, Select, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as countriesActions from '../Country/state/countriesActions'
import * as accountsActions from './state/accountsActions'

export const AccountEdit = (props: any) => {
  const { selectedAccount, handleClose } = props
  const { countryState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
    }),
    shallowEqual
  )
  const { handleSubmit } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [params, SetParams] = useState('' as any)
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  const dispatch = useDispatch()
  // Petición a API da lista de countries
  useEffect(() => {
    if (dispatch) {
      dispatch(countriesActions.fetchCountries())
    }
  }, [dispatch])
  // Recibida resposta actualiza o state
  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      setList(countryState.countryTable.entities)
      setIsLoading(countryState.listLoading)
    }
  }, [countryState])
  // mostra na lista o country da account seleccionada
  useEffect(() => {
    setCountry(selectedAccount?.attributes?.contact.country_id)
  }, [selectedAccount])
  // onSubmit metense os datos do formulario en formData
  const onSubmit = (data: any, e: any) => {
    e.preventDefault()
    SetParams(selectedAccount.id)
    data = { ...data, country_id: country }
    setFormData(data)
    handleClose()
  }
  // Chamada a accion cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(accountsActions.updateAccount(formData, params))
    }
  }, [formData, dispatch, params])
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <LinearProgress />
      )}
      <Grid container justify="space-between">
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled variant="contained">
          Submit
        </Button>
      </Grid>
    </form>
  )
}
