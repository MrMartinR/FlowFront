import { Button, Grid, TextField, FormControl, MenuItem, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as userAccountsActions from './state/userAccountsActions'
const categoriesIncome = [
  {
    value: 'Bonus',
    name: 'Bonus',
  },
  {
    value: 'Income',
    name: 'Income',
  },
  {
    value: 'Referral',
    name: 'Referral',
  },
]
const categoriesOutcome = [
  {
    value: 'Expense',
    name: 'Expense',
  },
  {
    value: 'Fee',
    name: 'Fee',
  },
  {
    value: 'Tax',
    name: 'Tax',
  },
]

export const CreateTransactionForm = (props: any) => {
  const { handleClose } = props
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [today, setToday] = useState('')
  const [income, setIncome] = useState('Bonus')
  const [outcome, setOutcome] = useState('Expense')
  const [kind, setKind] = useState('')
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)
  const dispatch = useDispatch()
  // onSubmit garda os datos do formulario nunha variable e pecha o formulario
  const onSubmit = (data: any) => {
    let category
    if (kind === 'Income') {
      category = income
    } else category = outcome
    const form = {
      ...data,
      kind,
      category,
      user_account_id: currentState.userAccountsDetails.id
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
  const handleInputChange = (e: any) => {
    const amount = e.target.value
    if (amount < 0) {
      setKind('Income')
    } else setKind('Outcome')
  }
  const handleIncome = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(event.target.value)
  }
  const handleOutcome = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutcome(event.target.value)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Create Transaction</Typography>
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <FormControl fullWidth>
              {today !== '' && (
                <TextField
                  name="date"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  defaultValue={today}
                  inputRef={register()}
                />
              )}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              {kind === 'Income' ? (
                <TextField
                  select
                  value={income}
                  margin="normal"
                  name='income'
                  variant="outlined"
                  onChange={handleIncome}
                >
                  {categoriesIncome.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  select
                  value={outcome}
                  name='outcome'
                  margin="normal"
                  variant="outlined"
                  onChange={handleOutcome}
                >
                  {categoriesOutcome.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Grid container>
                <Grid item xs={7}>
                  <TextField
                    name="amount"
                    label="Amount"
                    onChange={handleInputChange}
                    margin="normal"
                    variant="outlined"
                    inputRef={register()}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    disabled
                    name='currency'
                    margin="normal"
                    variant="outlined"
                    value={currentState.userAccountsDetails.attributes.currency.code}
                  />
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <FormControl fullWidth>
            <TextField
              multiline
              name="description"
              label="description"
              margin="normal"
              variant="outlined"
              inputRef={register()}
            />
          </FormControl>
        </Grid>
        <Grid container justify="space-between">
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
