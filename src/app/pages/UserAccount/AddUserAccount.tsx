import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  FormControlLabel,
  Select,
  MenuItem,
  LinearProgress,
  FormControl,
  Grid,
  TextField,
  Radio,
  RadioGroup,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as accountsActions from '../Account/state/accountsActions'
import * as userAccountsActions from './state/userAccountsActions'
function getSteps() {
  return ['Select Account Type', 'Select Account', 'Select Country', 'Select Currency', 'Choose a Name for the Account']
}
export const AddUserAccount = (props: any) => {
  const { handleClose } = props
  const [kind, setKind] = useState('Bank')
  const [account, setAccount] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [list, setList] = useState(null as any)
  const [countryList, setCountryList] = useState(null as any)
  const [currencyList, setCurrencyList] = useState(null as any)
  const [listFiltered, setListFiltered] = useState(null as any)
  const [isLoading, setIsLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const { register, handleSubmit, errors } = useForm()
  const [formData, setFormData] = useState(null as any)
  const steps = getSteps()
  const { accountsState } = useSelector(
    (state: RootState) => ({
      accountsState: state.accounts,
    }),
    shallowEqual
  )
  // peticion da lista de accounts
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(accountsActions.fetchAccounts())
  }, [dispatch])

  useEffect(() => {
    if (list !== null) {
      const l = list.filter((account: any) => account.attributes.category === kind)
      setListFiltered(l)
      if (l.length > 0) {
        setAccount(l[0].id)
        setCountryList(l[0].attributes.country_id)
        setCountry(l[0].attributes.country_id[0])
        setCurrencyList(l[0].attributes.currency_id)
        setCurrency(l[0].attributes.currency_id[0])
      }
    }
  }, [list, kind])

  // recibida a resposta actualiza as listas
  useEffect(() => {
    if (accountsState.accountsTable.entities?.length > 0) {
      if (accountsState.error === null) {
        setList(accountsState.accountsTable.entities)
        setIsLoading(accountsState.listLoading)
      } else {
        alert(accountsState.error)
      }
    }
  }, [accountsState])
  // funcion que garda o id co account seleccionado
  const handleAccount = (e: any) => {
    setAccount(e.target.value)
    const l = list.find((account: any) => account.id === e.target.value)
    setCountryList(l.attributes.country_id)
    setCountry(l.attributes.country_id[0])
    setCurrencyList(l.attributes.currency_id)
    setCurrency(l.attributes.currency_id[0])
  }
  // funcion para pasar o seguinte paso
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  // funcion para volver o paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleKind = (e: any) => {
    setKind(e.target.value)
  }

  // funcion que garda o id co country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  // funcion que garda o id co currency seleccionado
  const handleCurrency = (e: any) => {
    setCurrency(e.target.value)
  }
  // chamda a action createContact cando os datos do formulario estan listos
  useEffect(() => {
    if (formData !== null) {
      dispatch(userAccountsActions.createUserAccount(formData))
    }
  }, [dispatch, formData])
  // preparacion dos datos do formulario
  const onSubmit = (data: any, e: any) => {
    const form = {
      ...data,
      category: kind,
      country_id: country,
      currency_id: currency,
      account_id: account,
    }
    setFormData(form)
    handleClose()
  }
  // carga contido segun o paso actual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl margin="normal">
            <RadioGroup name="kind" value={kind} onChange={handleKind}>
              <Grid container>
                <FormControlLabel value="Bank" control={<Radio />} label="Bank" />
                <FormControlLabel value="Wallet" control={<Radio />} label="Wallet" />
                <FormControlLabel value="Investment" control={<Radio />} label="Investment" />
              </Grid>
            </RadioGroup>
          </FormControl>
        )
      case 1:
        return (
          <FormControl margin="normal">
            {!isLoading ? (
              <Select labelId="Accounts" value={account} onChange={handleAccount}>
                {listFiltered !== null &&
                  listFiltered.map((account: any) => (
                    <MenuItem value={account.id} key={account.id}>
                      {account.attributes.contact.trade_name}
                    </MenuItem>
                  ))}
              </Select>
            ) : (
              <LinearProgress />
            )}
          </FormControl>
        )
      case 2:
        return (
          <FormControl margin="normal">
            <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
              {countryList !== null &&
                countryList.map((country: any) => (
                  <MenuItem value={country} key={country}>
                    {country}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      case 3:
        return (
          <FormControl margin="normal">
            <Select labelId="Currency" id="currency" value={currency} onChange={handleCurrency}>
              {currencyList !== null &&
                currencyList.map((currency: any) => (
                  <MenuItem value={currency} key={currency}>
                    {currency}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )
      case 4:
        return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container direction="column">
              <Grid item>
                <TextField
                  name="name"
                  label="name"
                  placeholder="Name"
                  autoComplete="off"
                  inputRef={register({ required: true, minLength: 3 })}
                />
                {errors.name && errors.name.type === 'required' && <Alert severity="error">Name is required</Alert>}
                {errors.name && errors.name.type === 'minLength' && (
                  <Alert severity="error">Name should be at-least 3 characters.</Alert>
                )}
              </Grid>
              <Grid item>
                <Button type="submit" color="primary">
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <>
      <Typography variant="h6">Add User Account</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {/* <>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
                  Next
                </Button>
              </> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
          Next
        </Button>
        {/* @TODO: Replace the Next button with the Create Account/Submit Button {activeStep === 4}?? */}
        {/* @TODO: Mantener visible la seleccion a medida que se avanza en el stepper */}
      </>
    </>
  )
}
