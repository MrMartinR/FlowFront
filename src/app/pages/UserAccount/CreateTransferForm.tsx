import { FormLabel, Typography } from '@material-ui/core'
import { Button, Grid, TextField, LinearProgress, FormControl, MenuItem, InputAdornment } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as userAccountsActions from './state/userAccountsActions'
export const CreateTransferForm = (props: any) => {
  const { handleClose } = props
  const { register, handleSubmit } = useForm()
  const [formData, setFormData] = useState(null as any)
  const [today, setToday] = useState('')
  const [fx1, setFX1] = useState(null as any)
  const [fx2, setFX2] = useState(null as any)
  const [fx, setFX] = useState(null as any)
  const [account, setAccount] = useState('')
  const [userAccount, setUserAccount] = useState(null as any)
  const [list, setList] = useState(null as any)
  const [listFiltered, setListFiltered] = useState(null as any)
  const { currentState } = useSelector((state: RootState) => ({ currentState: state.userAccounts }), shallowEqual)
  const dispatch = useDispatch()
  // onSubmit garda os datos do fomrulario nunha variable e pecha o formulario
  const onSubmit = (data: any) => {
    const form = {
      ...data,
      user_account_id: account,
    }
    setFormData(form)
    handleClose()
  }

  // Chama a accion createTransaction para orixe e destrino
  useEffect(() => {
    if (formData !== null) {
      const amount2 = -1 * formData.amount * fx
      let kind1, kind2, notes
      if (formData.amount < 0) {
        kind1 = 'Outcome'
        kind2 = 'Income'
      } else {
        kind1 = 'Income'
        kind2 = 'Outcome'
      }
      if (formData.fx !== 1) {
        notes = `Exchange Rate 1 ${currentState.userAccountsDetails.attributes.currency.code} = ${fx} ${
          userAccount?.attributes?.currency.code
        }. Amount ${amount2 * fx} ${userAccount?.attributes?.currency.code} `
      } else notes = ''
      const transfer1 = {
        date: formData.date,
        description: formData.description,
        amount: formData.amount,
        kind: kind1,
        ref: '',
        time: '',
        loan_id: '',
        user_account_id: currentState.userAccountsDetails.id,
      }
      const transfer2 = {
        date: formData.date,
        description: formData.description,
        amount: amount2,
        kind: kind2,
        ref: '',
        user_account_id: formData.user_account_id,
        notes,
        time: '',
        loan_id: '',
      }
      dispatch(userAccountsActions.createTransaction(transfer1))
      dispatch(userAccountsActions.createTransaction(transfer2))
    }
  }, [dispatch, formData, currentState.userAccountsDetails, userAccount, fx])
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
  // garda a lista de user_Accounts do state e o valor fx_eur do account actual para calculos
  useEffect(() => {
    setList(currentState.userAccountsTable)
    // na base de datos o fx_eur do euro gardase como 0, pero matematicamente deberia ser 1
    if (currentState.userAccountsDetails?.attributes?.currency.fx_eur === 0) {
      setFX1('1')
    } else setFX1(currentState.userAccountsDetails?.attributes?.currency.fx_eur)
  }, [currentState])
  // filtra o user_account actual da lista
  useEffect(() => {
    if (list !== null) {
      setListFiltered(list.filter((item: any) => item.id !== currentState.userAccountsDetails.id))
    }
  }, [list, currentState.userAccountsDetails])
  // selecciona por defecto o primeiro user_account da lista
  useEffect(() => {
    if (listFiltered !== null) {
      setAccount(listFiltered[0].id)
      setUserAccount(listFiltered[0])
    }
  }, [listFiltered])
  // Cando escolles unha opcion da lista garda o valor
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(event.target.value)
    setUserAccount(listFiltered.find((option: any) => option.id === event.target.value))
  }
  // seleccionado un userAccount calcula o fx_rate
  useEffect(() => {
    if (userAccount?.attributes?.currency.fx_eur === 0) {
      setFX2('1')
      setFX(null)
    } else setFX2(userAccount?.attributes?.currency.fx_eur)
  }, [userAccount])
  useEffect(() => {
    if (fx2!==null && fx1!==null) {
      const x = fx2/fx1
      setFX(x.toFixed(2))
    }
  }, [fx2, fx1])
  const handleFX = (e:any) => {
    setFX(e.target.value)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Create Transfer</Typography>
      <Grid container direction="column">
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>Date</FormLabel>
              {today !== '' && <TextField name="date" type="date" defaultValue={today} inputRef={register()} />}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>Account</FormLabel>
              <TextField select value={account} name="accounts" onChange={handleChange}>
                {listFiltered !== null ? (
                  listFiltered.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.attributes.name}
                    </MenuItem>
                  ))
                ) : (
                  <LinearProgress />
                )}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>Amount</FormLabel>
              <TextField
                name="amount"
                type='number'
                autoComplete="off"
                placeholder="Amount"
                defaultValue={0}
                inputProps={{ step: "0.01" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{currentState.userAccountsDetails.attributes.currency.code}</InputAdornment>,
                }}
                inputRef={register()}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item xs={8}>
            <FormControl fullWidth>
              <FormLabel>Description</FormLabel>
              <TextField name="description" placeholder="Description"  autoComplete="off" inputRef={register()} />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <FormLabel>FX</FormLabel>
              <TextField
                name="fx"
                value={fx}
                onChange={handleFX}
                type='number'
                autoComplete="off"
                placeholder="FX"
                inputProps={{ step: "0.01" }}
                InputProps={{
                  endAdornment: <InputAdornment position="end">{userAccount?.attributes?.currency.code}</InputAdornment>,
                }}
              />
            </FormControl>
          </Grid>
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
