// TODO: Replace formik for react hook forms https://react-hook-form.com
import React, { Fragment } from 'react'
import { Modal, Container, Row, Col, Image } from 'react-bootstrap'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { MultiSelect } from '../../../sharedComponents/searchSelect'
import { Input } from '../../../sharedComponents/inputShared'
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(4, 'Type more than 4 characters')
      .max(20, 'Type less than 20 characters')
      .required('Name is required'),
    iso_code: Yup.string()
      .min(4, 'Type more than 4 characters')
      .max(10, 'Type less than 20 characters')
      .required('ISO Code is required'),
    continent: Yup.array()
      .min(4, 'Type more than 4 characters')
      .max(10, 'Type less than 20 characters')
      .required('Continent is required'),
    flag: Yup.boolean().required('The Flag is required'),
    currency_id: Yup.array()
      .min(1, 'Pick at least 1 tags')
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
  }),
  enableReinitialize: true,
  mapPropsToValues: ({ currency: { id, name, iso_code, continent, currency_id, flag } }) => ({
    id,
    name,
    iso_code,
    continent,
    currency_id: [], //currencyMap
    flag
  }),
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      currency_id: [values].contries.map((t) => t.value)
    }
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2))
      setSubmitting(false)
    }, 1000)
  },
  displayName: 'MyForm'
})

export const CurrencyEditForm = (props) => {
  const {
    values,
    touched,
    // dirty,
    errors,
    handleSubmit,
    // handleReset,
    setFieldValue,
    setFieldTouched,
    // isSubmitting,
    actionsLoading,
    onHide
  } = props
  return (
    <Fragment>
      <Modal.Body className="overlay overlay-block">
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <Container>
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
                  // addClass={["col-md-5", "col-xs-12"]}
                />
              </Col>
              <Col sm={4}>
                <Image src="holder.js/171x180" thumbnail />
              </Col>
            </Row>
            <Row>
              <Input
                value={values.name}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.name}
                touched={touched.name}
                name="name"
                type="text"
                addClass={['col-md-5', 'col-xs-12']}
              />
              <Input
                value={values.category}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.category}
                touched={touched.category}
                name="category"
                type="text"
                addClass={['col-md-5', 'col-xs-12']}
              />
              <MultiSelect
                value={values.contries}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.contries}
                touched={touched.contries}
                name="contries"
                multi={true}
                addClass={['col-md-5', 'col-xs-12']}
              />
              <MultiSelect
                value={values.currency}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.currency}
                touched={touched.currency}
                multi={true}
                name="currency"
                addClass={['col-md-5', 'col-xs-12']}
              />
            </Row>
          </Container>

          {/* <button
            type="button"
            className="outline"
            onClick={handleReset}
            disabled={!dirty || isSubmitting}
          >
            Reset
          </button>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button> */}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
          Cancel
        </button>
        <> </>
        <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary btn-elevate">
          Save
        </button>
      </Modal.Footer>
    </Fragment>
  )
}

export const MyEnhancedCurrencyForm = formikEnhancer(CurrencyEditForm)
