import React, { useEffect } from 'react'
import { FormControl, Typography, InputLabel, Grid, TextField, Button, Select, MenuItem } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Form } from './useForms'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { createCountry } from '../state/countriesActions'
import { fetchAllCurrencies } from '../../../../redux/currencies/currenciesActions'

const CountryForm = (props) => {
  const { handleSubmit, register, errors, control } = useForm()
  const { currencies, loadCurrencies, onSubmitClick } = props
  const { listLoading, currencyTable } = currencies
  const onSubmit = (data) => onSubmitClick(data)
  // const onSubmit = (data) => console.log(data)

  useEffect(() => {
    loadCurrencies()
  }, [loadCurrencies])

  if (listLoading) {
    return (
      <>
        <Typography variant="h6">...</Typography>
      </>
    )
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid xs={12}>
          <TextField inputRef={register} name="name" label="Country" defaultValue={props.name} />
          <br />
          {errors.name && errors.name.type === 'required' && <Alert severity="error">country is required</Alert>}
          {errors.name && errors.name.type === 'minLength' && (
            <Alert severity="error">name should have atleast 3 characters.</Alert>
          )}

          <TextField inputRef={register({ required: true, minLength: 2 })} name="iso_code" label="ISO Code" />
          {errors.iso_code && errors.iso_code.type === 'required' && (
            <Alert severity="error">ISO Code is required</Alert>
          )}
          {errors.iso_code && errors.iso_code.type === 'minLength' && (
            <Alert severity="error">name should have atleast 3 characters.</Alert>
          )}
          <TextField inputRef={register({ required: true, minLength: 3 })} name="continent" label="Continent" />
          {errors.continent && errors.continent.type === 'required' && (
            <Alert severity="error">Continent is required</Alert>
          )}
          {errors.continent && errors.continent.type === 'minLength' && (
            <Alert severity="error">name should have atleast 3 characters.</Alert>
          )}
          <TextField inputRef={register} name="flag" label="Flag" />
          {errors.flag && errors.flag.type === 'required' && <Alert severity="error">flag is required</Alert>}
          <TextField inputRef={register({ required: true })} name="fiscal_year_start" label="Fiscal year" />
          {errors.fiscal_year_start && errors.fiscal_year_start.type === 'required' && (
            <Alert severity="error">Fiscal year is required</Alert>
          )}

          <FormControl>
            <InputLabel>currency_id</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="">None</MenuItem>
                  {currencyTable.entities.map((item) => (
                    <MenuItem key={item.name} value={item.id}>
                      {' '}
                      {item.name}{' '}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="currency_id"
              rules={{ required: 'this is required' }}
              control={control}
              defaultValue=""
            />
          </FormControl>
          {errors.currency_id && errors.currency_id.type === 'required' && (
            <Alert severity="error">Currency Id is required</Alert>
          )}
          {errors.currency_id && errors.currency_id.type === 'minLength' && (
            <Alert severity="error">Currency Id should have atleast 3 characters.</Alert>
          )}

          <Button type="submit" text="Submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  onSubmitClick: (newPartner) => {
    dispatch(createCountry(newPartner))
  },
  loadCurrencies: () => {
    dispatch(fetchAllCurrencies())
  },
})

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryForm)
