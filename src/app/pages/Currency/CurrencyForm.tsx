import React from 'react'
/* eslint-disable  no-restricted-imports */
import * as Yup from 'yup'
import { Grid, FormGroup, FormControl, TextField } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const CurrencyForm = (props: any) => {
  const currencyForm = Yup.object().shape({
    name: Yup.string().required('Required'),
    code: Yup.string().required('Required'),
    symbol: Yup.string().required('Required'),
    decimal_places: Yup.string().required('Required'),
    kind: Yup.string().required('Required'),
  })

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(currencyForm),
  })

  const onSubmit = (event: any) => {}

  return (
    <Grid id="kt_add_currency_form">
      <FormGroup onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField
            id={`outlined-name-dense`}
            label="Name"
            type="text"
            margin="dense"
            variant="outlined"
            name={'name'}
            inputRef={register()}
          />
        </FormControl>
        <FormControl>
          <TextField
            id={`outlined-code-dense`}
            label="Code"
            type="text"
            margin="dense"
            variant="outlined"
            name="code"
            inputRef={register()}
          />
        </FormControl>
        <FormControl>
          <TextField
            id={`outlined-decimal_places-dense`}
            label="Decimal Places"
            type="number"
            margin="dense"
            variant="outlined"
            name="decimal_places"
            inputRef={register()}
          />
        </FormControl>
        <FormControl>
          <TextField
            id={`outlined-kind-dense`}
            label="Type"
            type="text"
            margin="dense"
            variant="outlined"
            name="kind"
            inputRef={register()}
          />
        </FormControl>
        <FormControl>
          <TextField
            id={`outlined-symbol-dense`}
            label="Symbol"
            type="text"
            margin="dense"
            variant="outlined"
            name="symbol"
            inputRef={register()}
          />
        </FormControl>
      </FormGroup>
    </Grid>
  )
}

export default CurrencyForm
