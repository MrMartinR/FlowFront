import React, { Fragment, useEffect, useState } from 'react'
import { Modal, Container, Row, Col } from 'react-bootstrap'
import * as Yup from 'yup'
import { MultiSelect } from '../../sharedComponents/searchSelect'
import { Input } from '../../sharedComponents/inputShared'
import { Avatar, Button } from '@material-ui/core'
/* eslint-disable  no-restricted-imports */
import { makeStyles } from '@material-ui/core/styles'

import { Stepper } from '@material-ui/core'
import { Step } from '@material-ui/core'
import { StepLabel } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const useStyles = makeStyles((theme) => ({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bigAvatar: {
    margin: 10,
    width: '10rem',
    height: '10rem',
  },
  input: {
    display: 'none',
  },
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function getSteps() {
  return ['Select category', 'Select country', 'Select currency']
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...'
    case 1:
      return 'What is an ad group anyways?'
    case 2:
      return 'This is the bit I really care about!'
    default:
      return 'Uknown stepIndex'
  }
}

export const AccountEditForm = (props) => {
  const { values, touched, setFieldValue, setFieldTouched, onHide, currencyTable, countriesTable } = props

  const validationSchema = Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string()
      .min(4, 'Type more than 4 characters')
      .max(20, 'Type less than 20 characters')
      .required('Name is required'),
    category: Yup.string()
      .min(4, 'Type more than 4 characters')
      .max(20, 'Type less than 20 characters')
      .required('Category is required'),
    icon: Yup.string().required('An Icon is required'),
    currency: Yup.array().min(1),
    countries: Yup.array().min(1),
    createAccountFunc: null,
  })

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = getSteps()

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  function handleReset() {
    setActiveStep(0)
  }

  useEffect(() => {
    if (currencyTable && countriesTable) {
      let selecData = {
        countries: [],
        currencies: [],
      }

      currencyTable.map((data) => {
        selecData.currencies.push({
          value: data.id,
          label: data.name,
        })
        return null
      })

      countriesTable.map((data) => {
        selecData.countries.push({
          value: data.id,
          label: data.name,
        })
        return null
      })

      setSelectionData(selecData)
    }
  }, [currencyTable, countriesTable])

  const [iconData, setIconData] = useState(null)
  const [selectionData, setSelectionData] = useState(null)

  const getUrlFromSvgString = (string) => {
    let blob = new Blob([string], { type: 'image/svg+xml' })
    let url = URL.createObjectURL(blob)
    return url
  }

  const fileUploaded = (e) => {
    // console.log(e.target.files);
    var fr = new FileReader()
    fr.onload = function () {
      // console.log("INN");
      // console.log(fr.result);
      let data = fr.result
      let index = data.indexOf('<svg')
      if (index < 0) {
        return
      }
      if (index !== 0) {
        data = data.substring(index) // removing extra text from the start of file.
        data = data.replace(/(\r\n|\n|\r)/gm, '')
        setFieldValue('icon', data)
      }
      // console.log(data);
      setIconData(data)
    }

    fr.readAsText(e.target.files[0])
  }

  return (
    <Fragment>
      <Modal.Body className="overlay overlay-block">
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <form>
              <Container>
                {activeStep === 0 && (
                  <Row>
                    <Col sm={8}>
                      <Input
                        value={values.name}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.name}
                        touched={touched.name}
                        name="name"
                        type="text"
                        inputRef={register()}
                        // addClass={["col-md-5", "col-xs-12"]}
                      />
                      <Input
                        value={values.category}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        error={errors.category}
                        touched={touched.category}
                        name="category"
                        type="text"
                        inputRef={register()}
                        // addClass={["col-md-5", "col-xs-12"]}
                      />
                    </Col>
                    <Col sm={4} className={classes.avatarContainer}>
                      <Avatar className={classes.bigAvatar} src={iconData ? getUrlFromSvgString(iconData) : null} />
                      <input
                        name={'icon'}
                        accept="image/svg+xml"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        inputRef={register()}
                        onChange={fileUploaded}
                      />
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                          Upload
                        </Button>
                      </label>
                    </Col>
                  </Row>
                )}
                {activeStep === 1 && (
                  <Row>
                    <MultiSelect
                      value={values.countries}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.countries}
                      touched={touched.countries}
                      name="countries"
                      multi={true}
                      addClass={['col-md-8', 'col-xs-12']}
                      inputRef={register()}
                      list={selectionData ? selectionData.countries : []}
                    />
                  </Row>
                )}
                {activeStep === 2 && (
                  <Row>
                    <MultiSelect
                      value={values.currency}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      error={errors.currency}
                      touched={touched.currency}
                      multi={true}
                      name="currency"
                      inputRef={register()}
                      addClass={['col-md-8', 'col-xs-12']}
                      list={selectionData ? selectionData.currencies : []}
                    />
                  </Row>
                )}
              </Container>
            </form>
          </div>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.backButton}>
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      {activeStep === steps.length && (
        <Modal.Footer>
          <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
            Cancel
          </button>
          <> </>
          <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary btn-elevate">
            Save
          </button>
        </Modal.Footer>
      )}
    </Fragment>
  )
}

export const EnhancedUserAccountForm = AccountEditForm
