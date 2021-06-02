import React, { useEffect, useState } from 'react'
/* eslint-disable no-restricted-imports*/
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Select,
  MenuItem,
  LinearProgress,
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
  const { countryState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
    }),
    shallowEqual
  )
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [country, setCountry] = useState('')
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [kind, setKind] = useState('Individual')
  const [visibility, setVisibility] = useState('Private')
  const [checkState, setCheckState] = useState({
    checkedA: false,
    checkedB: false,
  })
  const [checkVisible, setCheckVisible] = useState({
    checkedC: false,
    checkedD: false,
  })

  // funcion que garda o id co country seleccionado
  const handleCountry = (e: any) => {
    setCountry(e.target.value)
  }
  // funcion que garda os campos dos checkboxes kind e visibility
  const handleKind = (e: any) => {
    if (e.target.name === 'checkedA') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedB']: false,
      })
    }
    if (e.target.name === 'checkedB') {
      setCheckState({
        ...checkState,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedA']: false,
      })
    }
    if (e.target.name === 'checkedC') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedD']: false,
      })
    }
    if (e.target.name === 'checkedD') {
      setCheckVisible({
        ...checkVisible,
        [e.target.name]: e.target.checked,
        /* eslint-disable no-useless-computed-key */
        ['checkedC']: false,
      })
    }
  }

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
  // Actualiza a variable kind
  useEffect(() => {
    if (checkState.checkedA === true) {
      setKind('Company')
    }
    if (checkState.checkedB === true) {
      setKind('Individual')
    }
  }, [checkState])
  // Actualiza a variable visibility
  useEffect(() => {
    if (checkVisible.checkedC === true) {
      setVisibility('Private')
    }
    if (checkVisible.checkedD === true) {
      setVisibility('Public')
    }
  }, [checkVisible])
  // carga contido segun o paso actual
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkState.checkedA} name="checkedA" onChange={handleKind} />}
              label="Company"
            />
            <FormControlLabel
              control={<Checkbox checked={checkState.checkedB} onChange={handleKind} name="checkedB" />}
              label="Individual"
            />
          </FormGroup>
        )
      case 1:
        return !isLoading ? (
          <Select labelId="Country" id="country" value={country} onChange={handleCountry}>
            {list.map((country: any) => (
              <MenuItem value={country.id} key={country.id}>
                {country.attributes.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <LinearProgress color="secondary" />
        )
      case 2:
        return (
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedC} name="checkedC" onChange={handleKind} />}
              label="Private"
            />
            <FormControlLabel
              control={<Checkbox checked={checkVisible.checkedD} onChange={handleKind} name="checkedD" />}
              label="Public"
            />
          </FormGroup>
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
  // funcion para volver o primeiro paso
  const handleReset = () => {
    setActiveStep(0)
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
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Paper>
      )}
    </>
  )
}
