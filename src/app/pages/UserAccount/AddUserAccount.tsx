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
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
function getSteps() {
  return ['Select Account Type', 'Select Account', 'Select Country', 'Select Currency', 'Choose a Name for the Account']
}
export const AddUserAccount = (props: any) => {
  const { handleClose } = props
  const [kind, setKind] = useState('Bank')
  const [account, setAccount] = useState('')
  const [country, setCountry] = useState('')
  const [currency, setCurrency] = useState('')
  const [name, setName] = useState('')
  const [list, setList] = useState(null as any)
  const [countryList, setCountryList] = useState(null as any)
  const [currencyList, setCurrencyList] = useState(null as any)
  const [listFiltered, setListFiltered] = useState(null as any)
  const [isLoading, setIsLoading] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState(null as any)
  const steps = getSteps()
  const { accountsState } = useSelector(
    (state: RootState) => ({
      accountsState: state.accounts,
    }),
    shallowEqual
  )
  const AddUserAccountSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name should be at-least 3 characters.')
      .max(50, 'Name should be less than 50 characters'),
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddUserAccountSchema),
  })
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
        setName(l[0].attributes.contact.trade_name)
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
    setName(l.attributes.contact.trade_name)
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
          <Grid container direction="column">
            <Grid item>
              {/* Sustituir por un icono cando existan*/}
              <Typography>{kind}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container direction="column">
            <Grid item>
              {/* Sustituir por un icono cando existan*/}
              <Typography>{kind}</Typography>
              {/* Sustituir por icono*/}
              <Typography>{name}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container direction="column">
            <Grid item>
              {/* Sustituir por un icono cando existan*/}
              <Typography>{kind}</Typography>
              {/* Sustituir por icono*/}
              <Typography>{name}</Typography>
              {/* Sustituir por bandeira cando a resposta inclua os attributes*/}
              <Typography>{country}</Typography>
            </Grid>
            <Grid item>
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
            </Grid>
          </Grid>
        )
      case 4:
        return (
          <Grid container direction="column">
            <Grid item>
              {/* Sustituir por un icono cando existan*/}
              <Typography>{kind}</Typography>
              {/* Sustituir por icono*/}
              <Typography>{name}</Typography>
              {/* Sustituir por bandeira cando a resposta inclua os attributes*/}
              <Typography>{country}</Typography>
              {/* Sustituir por CODE cando a resposta inclua os attributes*/}
              <Typography>{currency}</Typography>
            </Grid>
            <Grid item>
              <TextField
                name="name"
                defaultValue={name}
                label="name"
                placeholder="Name"
                autoComplete="off"
                inputRef={register()}
              />
              {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
            </Grid>
          </Grid>
        )
      default:
        return 'Unknown step'
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h6">Add User Account</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Grid>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
          Next
        </Button>
        <Button type="submit" disabled={activeStep !== steps.length - 1} color="primary">
          Create Account
        </Button>
        {/* @TODO: Mantener visible la seleccion a medida que se avanza en el stepper */}
      </Grid>
    </form>
  )
}
