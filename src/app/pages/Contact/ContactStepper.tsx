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
} from '@material-ui/core'
import { ContactAdd } from './ContactAdd'
import { RootState } from '../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as countriesActions from '../Country/state/countriesActions'

function getSteps() {
  return ['Select Contact Type', 'Select Country', 'Select Visibility', 'Fill in Contact Details']
}

export const VerticalLinearStepper = (props: any) => {
  const { handleClose } = props
  const { countryState, authState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
      authState: state.auth,
    }),
    shallowEqual
  )
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [kind, setKind] = useState('Individual')
  const [canPublic, setCanPublic] = useState(false)
  const [visibility, setVisibility] = useState('Private')
  
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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(countriesActions.fetchCountries())
  }, [dispatch])
  // recibida a resposta actualiza as listas
  useEffect(() => {
    if (countryState && countryState.countryTable && countryState.countryTable.entities.length > 0) {
      if (countryState.error === null) {
        setList(countryState.countryTable.entities)
        setIsLoading(countryState.listLoading)
        setCountry('a8891cb3-dca8-4d0e-a3bf-463f9ecce594')
      } else {
        alert(countryState.error)
      }
    }
  }, [countryState])
  const handleKind = (e:any) => {
    setKind(e.target.value)
  }
  const handleVisibility = (e:any) => {
    setVisibility(e.target.value)
  }
  // carga contido segun o paso actual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl margin='normal'>
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
          <FormControl margin='normal'>
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
          <FormControl margin='normal'>
            <RadioGroup name="visibility" value={visibility} onChange={handleVisibility}>
              <Grid container>
                <FormControlLabel disabled = {!canPublic} value="Public" control={<Radio />} label="Public" />
                <FormControlLabel value="Private" control={<Radio />} label="Private" />
              </Grid>
            </RadioGroup>
          </FormControl>
        )
      case 3:
        return <ContactAdd kind={kind} country={country} handleClose={handleClose} visibility={visibility} />
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
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button color="primary" disabled={activeStep === steps.length - 1} onClick={handleNext}>
                  Next
                </Button>
              </>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  )
}
