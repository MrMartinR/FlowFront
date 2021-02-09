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
} from '@material-ui/core'
import ContactAdd from './contactAdd'
import { RootState } from '../../../redux/rootReducer'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as countriesActions from '../Country/state/countriesActions'

function getSteps() {
  return ['Select Contact Type', 'Select Country', 'Select Visibility', 'Fill in Contact Details']
}

export const VerticalLinearStepper = () => {
  const { countryState } = useSelector(
    (state: RootState) => ({
      countryState: state.countries,
    }),
    shallowEqual
  )
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const [kind, setKind] = React.useState('Individual' as any)
  const [visibility, setVisibility] = React.useState('Private')
  const [checkState, setCheckState] = React.useState({
    checkedA: false,
    checkedB: false,
  })
  const [checkVisible, setCheckVisible] = React.useState({
    checkedC: false,
    checkedD: false,
  })

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

  // contact Redux state
  const GetAllCountries = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(countriesActions.getAllCountries())
      }
    }, [dispatch])
  }
  GetAllCountries()
  // useEffect(() => {
  //   if (countryState && countryState.countriesTable && countryState.countryTable.entities) {
  //     setList(countryState.countryTable.entities)
  //     setIsLoading(countryState.listLoading)
  //   }
  // }, [countryState])
  // console.log(list)
  // console.log(isLoading)

  useEffect(() => {
    if (checkState.checkedA === true) {
      setKind('Company')
    }
    if (checkState.checkedB === true) {
      setKind('Individual')
    }
  }, [checkState])
  useEffect(() => {
    if (checkVisible.checkedC === true) {
      setVisibility('Private')
    }
    if (checkVisible.checkedD === true) {
      setVisibility('Public')
    }
  }, [checkVisible])

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
        return 'select country'
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
        return <ContactAdd kind={kind} visibility={visibility} />
      default:
        return 'Unknown step'
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

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
export default VerticalLinearStepper
