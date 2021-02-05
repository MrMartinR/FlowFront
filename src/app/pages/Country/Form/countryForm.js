import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Form } from './useForms'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createCountry } from '../state/countriesActions'
import Control from './controls/controls'

const CountryForm = (props) => {
  const { handleSubmit, register, errors } = useForm()
  // const { onSubmitClick } = props

  // const onSubmit = (data) => {
  //   onSubmitClick(data)
  // }

  const { onSubmitClick } = props

  const onSubmit = (data) => onSubmitClick(data)

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid container>
        <Grid xs={12}>
          <TextField
            inputRef={register({ required: true, minLength: 3 })}
            name="name"
            label="Country"
            defaultValue={props.name}
          />{' '}
          <br />
          {errors.name && errors.name.type === 'required' && <Alert severity="error">country is required</Alert>}
          {errors.name && errors.name.type === 'minLength' && (
            <Alert severity="error">name should have atleast 3 characters.</Alert>
          )}
          <TextField inputRef={register({ required: true, minLength: 3 })} name="iso_code" label="ISO Code" />
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
          <TextField inputRef={register({ required: true, minLength: 3 })} name="currency_id" label="Currency Id" />
          {errors.currency_id && errors.currency_id.type === 'required' && (
            <Alert severity="error">Currency Id is required</Alert>
          )}
          {errors.currency_id && errors.currency_id.type === 'minLength' && (
            <Alert severity="error">Currency Id should have atleast 3 characters.</Alert>
          )}
          <TextField inputRef={register({ required: true })} name="flag" label="Flag" />
          {errors.flag && errors.flag.type === 'required' && <Alert severity="error">flag is required</Alert>}
          <TextField inputRef={register({ required: true })} name="fiscal_year_start" label="Fiscal year" />
          {errors.fiscal_year_start && errors.fiscal_year_start.type === 'required' && (
            <Alert severity="error">Fiscal year is required</Alert>
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
})

// export default connect(({ name }) => ({ name }), createCountry)(CountryForm);

export default connect(null, mapDispatchToProps)(CountryForm)
