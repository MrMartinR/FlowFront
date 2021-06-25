import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
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
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { RootState } from '../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as countriesActions from '../Country/state/countriesActions'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import * as contactsActions from './state/contactsActions'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

function getSteps() {
  return ['Select Contact Type', 'Select Country', 'Select Visibility', 'Fill in Contact Details']
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 5,
    },
  })
)
export const VerticalLinearStepper = (props: any) => {
  const classes = useStyles()
  const { handleClose } = props
  const { countryState, authState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
      authState: state.auth,
    }),
    shallowEqual
  )
  const [formData, setFormData] = useState(null as any)
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [kind, setKind] = useState('Individual')
  const [canPublic, setCanPublic] = useState(false)
  const [visibility, setVisibility] = useState('Private')
  const dispatch = useDispatch()
  let AddContactSchema  
  if (kind === 'Individual') {
    AddContactSchema = Yup.object().shape({
      name: Yup.string()
      .required('Name is required')
      .min(3, 'Name should be at least 3 characters.')
      .max(50, 'Name should be less than 50 characters')
    })
   } else {
    AddContactSchema = Yup.object().shape({
      trade_name: Yup.string()
        .required('Trade name is required')
        .min(3, 'Trade name should be at least 3 characters.')
        .max(50, 'Trade name should be less than 50 characters')
    })
  }
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(AddContactSchema),
  })
  // funcion que prepara os datos para facer a peticion e pecha o dialog
  const onSubmit = (data: any) => {
    data = { ...data, kind: kind, country_id: country, visibility: visibility }
    if (kind === 'Individual') {
      data = { ...data, trade_name: null }
    } else {
      data = { ...data, name: null }
    }
    setFormData(data)
    handleClose()
  }
  // peticion cos datos do formulario
  useEffect(() => {
    if (formData !== null) {
      dispatch(contactsActions.createContact(formData))
    }
  }, [dispatch, formData])
  // funcion que garda o id co country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  // funcion que garda un boolean que indica se o user actual pode editar ou borrar o contact actual
  useEffect(() => {
    if (authState.role !== 'user') {
      setCanPublic(true)
    } else setCanPublic(false)
  }, [authState])
  // peticion da lista de countries
  useEffect(() => {
    dispatch(countriesActions.fetchCountries())
  }, [dispatch])
  // recibida a resposta actualiza as listas
  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      if (countryState.error === null) {
        setList(countryState.countryTable.entities)
        setIsLoading(countryState.listLoading)
        setCountry(countryState.countryTable.entities[0].id)
      } else {
        alert(countryState.error)
      }
    }
  }, [countryState])
  const handleKind = (e: any) => {
    setKind(e.target.value)
  }
  const handleVisibility = (e: any) => {
    setVisibility(e.target.value)
  }
  // carga contido segun o paso actual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl margin="normal">
            <RadioGroup name="kind" value={kind} onChange={handleKind}>
              <Grid container>
                <FormControlLabel value="Company" control={<Radio />} label="Company" />
                <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
              </Grid>
            </RadioGroup>
          </FormControl>
        )
      case 1:
        return (
          <FormControl margin="normal">
            {!isLoading ? (
              <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
                {list.map((country: any) => (
                  <MenuItem value={country.id} key={country.id}>
                    {country.attributes.name}
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
            <RadioGroup name="visibility" value={visibility} onChange={handleVisibility}>
              <Grid container>
                <FormControlLabel disabled={!canPublic} value="Public" control={<Radio />} label="Public" />
                <FormControlLabel value="Private" control={<Radio />} label="Private" />
              </Grid>
            </RadioGroup>
          </FormControl>
        )
      case 3:
        return (
          <Grid container direction="column">
            <TextField name="kind" label="Kind" disabled variant="filled" value={kind} className={classes.root} />
            <TextField
              name="visibility"
              label="Select"
              variant="filled"
              disabled
              value={visibility}
              className={classes.root}
            />
            {kind === 'Individual' ? (
              <Grid container direction="column">
                <TextField
                  name="name"
                  label="name"
                  variant="outlined"
                  placeholder="Name"
                  autoComplete="off"
                  inputRef={register()}
                  className={classes.root}
                />
                {errors.name && <Alert severity="error">{errors.name.message}</Alert>}
              </Grid>
            ) : (
              <Grid container direction="column">
                <TextField
                  name="trade_name"
                  label="Trade name"
                  variant="outlined"
                  placeholder="Trade name"
                  autoComplete="off"
                  inputRef={register()}
                  className={classes.root}
                />
                {errors.trade_name && <Alert severity="error">{errors.trade_name.message}</Alert>}
              </Grid>
            )}
          </Grid>
        )
      default:
        return 'Unknown step'
    }
  }
  // funcion para pasar o seguinte paso
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  // funcion para volver o paso anterior
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Add Contact</Typography>
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
          Create Contact
        </Button>
      </Grid>
    </form>
  )
}
