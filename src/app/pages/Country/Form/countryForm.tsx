import React, { useEffect } from 'react'
import { FormControl, Typography, InputLabel, Grid, TextField, Button, MenuItem, Select } from '@material-ui/core'
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
  iso_code: yup.string().required('iso_code is required').min(2).max(3),
  currency_id: yup.string().required('currency id is required'),
  continent: yup.string().required('continent is required'),
  flag: yup.mixed().required('flag is required'),
  fiscal_year_start: yup
    .string()
    .matches(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/, 'format is incorrect'),
  // yup.date().required('date is required'),
})

const CountryForm = (props: any) => {
  const { handleSubmit, register, errors, control } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const classes = useStyles()

  const { currencies, loadCurrencies, onSubmitClick } = props
  const { listLoading, currencyTable } = currencies

  const continentArray = ['Europe', 'Asia', 'Africa', 'Australia', 'North America', 'South America']
  // const onSubmit = (data: any) => console.log(data)

  const onSubmit = (data: any) => onSubmitClick(data)

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

  console.log(currencyTable.entities)

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
                      {item.attributes.code}
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

          <FormControl>
            <InputLabel>continent</InputLabel>
            <Controller
              as={
                <Select>
                  <MenuItem value="">None</MenuItem>
                  {continentArray.map((item: any, idx: any) => (
                    <MenuItem key={idx} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="continent"
              rules={{ required: 'this is required' }}
              control={control}
              defaultValue=""
            />
          </FormControl>
          {errors.continent?.message && <p className={classes.error}>{errors.continent?.message}</p>}

          <Button variant="contained" component="label">
            Upload Flag
            <input ref={register} name="flag" type="file" hidden />
          </Button>
          {errors.flag?.message && <p className={classes.error}>{errors.flag?.message}</p>}

          <TextField inputRef={register} name="fiscal_year_start" label="Fiscal year" placeholder="yyyy-MM-dd" />
          {errors.fiscal_year_start?.message && <p className={classes.error}>{errors.fiscal_year_start?.message}</p>}
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
