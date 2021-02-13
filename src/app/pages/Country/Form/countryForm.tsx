import React, { useEffect } from 'react'
import { FormControl, Typography, InputLabel, Grid, TextField, Button, Select, MenuItem } from '@material-ui/core'
import { Form, MyButton } from './useForms'
import { connect } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createCountry } from '../state/countriesActions'
import { fetchAllCurrencies } from '../../../../redux/currencies/currenciesActions'
import { useStyles } from './useForms'

const schema = yup.object().shape({
  name: yup.string().required('name of country is required'),
  iso_code: yup.string().required('iso code is required'),
  continent: yup.string().required('continent is required'),
  currency_id: yup.string().required('currency id is required'),
  flag: yup.mixed().required('flag is required'),
  fiscal_year_start: yup.date().required('date is required'),
})

const CountryForm = (props: any) => {
  const { handleSubmit, register, errors, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const classes = useStyles()

  const { currencies, loadCurrencies, onSubmitClick } = props
  const { listLoading, currencyTable } = currencies

  // const onSubmit = (data: any) => console.log(data)

  const onSubmit = (data: any) => onSubmitClick(data)

  console.log()
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
          <TextField inputRef={register} name="name" label="Country" />
          <br />
          {errors.name?.message && <p className={classes.error}>{errors.name?.message}</p>}

          <TextField inputRef={register} name="iso_code" label="ISO Code" />
          {errors.iso_code?.message && <p className={classes.error}>{errors.iso_code?.message}</p>}

          <FormControl>
            <InputLabel>currency_id</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="">None</MenuItem>
                  {currencyTable.entities.map((item: any) => (
                    <MenuItem key={item.attributes.name} value={item.id}>
                      {item.attributes.name}
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
          {errors.currency_id?.message && <p className={classes.error}>{errors.currency_id?.message}</p>}

          <TextField inputRef={register} name="continent" label="Continent" />
          {errors.continent?.message && <p className={classes.error}>{errors.continent?.message}</p>}

          <Button variant="contained" component="label">
            Upload File
            <input ref={register} name="flag" type="file" hidden />
          </Button>
          {errors.flag?.message && <p className={classes.error}>{errors.flag?.message}</p>}

          <TextField inputRef={register} name="fiscal_year_start" label="Fiscal year" />
          {errors.fiscal_year_start?.message && <p className={classes.error}>Fiscal year is required</p>}
          <div>
            <MyButton type="submit">Submit</MyButton>
          </div>
        </Grid>
      </Grid>
    </Form>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  onSubmitClick: (newPartner: any) => {
    dispatch(createCountry(newPartner))
  },
  loadCurrencies: () => {
    dispatch(fetchAllCurrencies())
  },
})

const mapStateToProps = (state: any) => {
  return {
    currencies: state.currencies,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryForm)
