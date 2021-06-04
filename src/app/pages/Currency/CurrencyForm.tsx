import * as Yup from 'yup'
import { Grid, FormGroup, FormControl, TextField } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as currenciesActions from './state/currenciesActions'
export const CurrencyForm = (props: any) => {
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
  const dispatch = useDispatch()
  const onSubmit = (data: any, e: any) => {
    dispatch(currenciesActions.createCurrency(data))
  }

  return (
    <Grid container direction="column" spacing={2}>
      <FormGroup onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <TextField label="Name" type="text" margin="dense" variant="outlined" name="name" inputRef={register()} />
        </FormControl>
        <FormControl>
          <TextField label="Code" type="text" margin="dense" variant="outlined" name="code" inputRef={register()} />
        </FormControl>
        <FormControl>
          <TextField
            label="Decimal Places"
            type="number"
            margin="dense"
            variant="outlined"
            name="decimal_places"
            inputRef={register()}
          />
        </FormControl>
        <FormControl>
          <TextField label="Type" type="text" margin="dense" variant="outlined" name="kind" inputRef={register()} />
        </FormControl>
        <FormControl>
          <TextField label="Symbol" type="text" margin="dense" variant="outlined" name="symbol" inputRef={register()} />
        </FormControl>
        <FormControl>
          <TextField label="Fx_eur" type="text" margin="dense" variant="outlined" name="fx_eur" inputRef={register()} />
        </FormControl>
      </FormGroup>
    </Grid>
  )
}
