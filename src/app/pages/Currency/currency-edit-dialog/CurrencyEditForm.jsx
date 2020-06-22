// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Fragment } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "../../../sharedComponents/searchSelect";
import { Input } from "../../../sharedComponents/inputShared";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    id: Yup.string().nullable(),
    name: Yup.string()
      .min(4, "Type more than 4 characters")
      .max(20, "Type less than 20 characters")
      .required("Name is required"),
    category: Yup.string()
      .min(4, "Type more than 4 characters")
      .max(20, "Type less than 20 characters")
      .required("Category is required"),
    icon: Yup.mixed().nullable(),
    // .required('An Icon is required'),
    currency: Yup.array()
      .nullable(),
    countries: Yup.array()
      .nullable(),
  }),
  enableReinitialize: true,
  mapPropsToValues: ({
    currencies: { id, name, category, icon, country, currency },
  }) => {

    // let countryMap =
    //   country !== undefined && !country
    //     ? []
    //     : country.map((c) => ({ value: c.id, label: c.name }));


    return {
      id,
      name,
      category,
      icon: icon,
      country: [], //countryMap
      currency: [], //currencyMap
    };
  },
  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      countries: [values].countries.map((t) => t.value),
      currency: [values].currency.map((t) => t.value),
    };
    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "MyForm",
});

export const CurrencyEditForm = (props) => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
    actionsLoading,
    onHide,
  } = props;
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
            <MultiSelect
                value={values.platform_id}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.platform_id}
                touched={touched.platform_id}
                multi={true}
                name="Platform"
                addClass={["col-md-5", "col-xs-12"]}
              />
            </Row>
            <Row>
              <MultiSelect
                value={values.countries}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.countries}
                touched={touched.countries}
                name="countries"
                multi={true}
                addClass={["col-md-5", "col-xs-12"]}
              />
              <MultiSelect
                value={values.currency}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.currency}
                touched={touched.currency}
                multi={true}
                name="currency"
                addClass={["col-md-5", "col-xs-12"]}
              />
              <MultiSelect
                value={values.platform_id}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.platform_id}
                touched={touched.platform_id}
                multi={true}
                name="Platform"
                addClass={["col-md-5", "col-xs-12"]}
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
        <button
          type="button"
          onClick={onHide}
          className="btn btn-light btn-elevate"
        >
          Cancel
        </button>
        <> </>
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="btn btn-primary btn-elevate"
        >
          Save
        </button>
      </Modal.Footer>
    </Fragment>
  );
};

export const MyEnhancedCurrencyForm = formikEnhancer(CurrencyEditForm);
