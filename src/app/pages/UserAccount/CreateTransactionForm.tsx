import { Button, Grid, TextField, FormControl, Typography, FormLabel, NativeSelect, InputAdornment } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as userAccountsActions from './state/userAccountsActions'

export const CreateTransactionForm = (props: any) => {
  const { handleClose } = props
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [today, setToday] = useState('')
  const [category, setCategory] = useState('Bonus')
  const [kind, setKind] = useState('Income')
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)
  const dispatch = useDispatch()
  // onSubmit garda os datos do formulario nunha variable e pecha o formulario
  const onSubmit = (data: any) => {
    let amount
    if (kind ==='Income') {
      amount = data.amount
    } else amount = -1*data.amount
    const form = {
      ...data,
      amount,
      kind,
      category,
      user_account_id: currentState.userAccountsDetails.id,
    }
    setFormData(form)
    handleClose()
  }
  // preparados os datos envianse a userAccountsActions
  useEffect(() => {
    if (formData !== null) {
      dispatch(userAccountsActions.createTransaction(formData))
    }
  }, [dispatch, formData])
  // Prepara o formato da fecha actual para por por defecto no datepicker
  useEffect(() => {
    const date = new Date()
    const year = date.getFullYear()
    let month
    if (date.getMonth() < 9) {
      month = `0${date.getMonth() + 1}`
    } else month = `${date.getMonth() + 1}`
    const day = date.getDate()
    setToday(`${year}-${month}-${day}`)
  }, [setToday])
  const handleCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
    if (event.target.value === 'Bonus' || event.target.value === 'Income' || event.target.value === 'Referral') {
      setKind('Income')
    } else setKind('Outcome')
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Create Transaction</Typography>
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>Date</FormLabel>
              {today !== '' && <TextField name="date" type="date" defaultValue={today} inputRef={register()} />}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <FormLabel>Category</FormLabel>
              <NativeSelect value={category} name="category" onChange={handleCategory}>
                <optgroup label="Income">
                  <option value="Bonus">Bonus</option>
                  <option value="Income">Income</option>
                  <option value="Referral">Referral</option>
                </optgroup>
                <optgroup label="Outcome">
                  <option value="Expense">Expense</option>
                  <option value="Fee">Fee</option>
                  <option value="Tax">Tax</option>
                </optgroup>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>Amount</FormLabel>
              <TextField
                name="amount"
                type='number'
                placeholder="Amount"
                defaultValue={0}
                inputProps={{ step: "0.01" }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">{kind==='Outcome'&&'-'}</InputAdornment>,
                  endAdornment: <InputAdornment position="end">{currentState.userAccountsDetails.attributes.currency.code}</InputAdornment>,
                }}
                inputRef={register()}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <FormControl fullWidth>
            <FormLabel>Description</FormLabel>
            <TextField name="description" placeholder="Description" inputRef={register()} />
          </FormControl>
        </Grid>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
