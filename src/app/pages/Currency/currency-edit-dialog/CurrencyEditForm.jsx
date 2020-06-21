// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Fragment } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../sharedComponents/inputShared";
const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    asd: Yup.string()
      .min(3, "orale escribele")
      .required("qie ñe esvriba"),
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
      .nullable()
      .required("Pick at least 3 tags")
      .min(3, "Pick at least 3 tags")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
    contries: Yup.array()
      .min(3, "Pick at least 3 tags")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
      ),
  }),
  enableReinitialize: true,
  mapPropsToValues: ({
    currencies: { id, name, code, symbol, decimal_place, kind, fx_euro, },
  }) => {

    // let countryMap =
    //   country !== undefined && !country
    //     ? []
    //     : country.map((c) => ({ value: c.id, label: c.name }));


    return {
      id,
      name,
      code,
      symbol,
      decimal_place,
      kind,
      fx_euro
    };
  },
  // handleSubmit: (values, { setSubmitting }) => {
  //   const payload = {
  //     ...values,
  //     contries: [values].contries.map((t) => t.value),
  //     currency: [values].currency.map((t) => t.value),
  //   };
  //   setTimeout(() => {
  //     alert(JSON.stringify(payload, null, 2));
  //     setSubmitting(false);
  //   }, 1000);
  // },
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
                  value={values.code}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.code}
                  touched={touched.code}
                  name="code"
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
                value={values.symbol}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.symbol}
                touched={touched.symbol}
                name="symbol"
                type="text"
                addClass={["col-md-5", "col-xs-12"]}
              />
              <Input
                value={values.decimal_place}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.decimal_place}
                touched={touched.decimal_place}
                name="decimal_places"
                type="text" //decimal
                addClass={["col-md-5", "col-xs-12"]}
              />
            </Row>
            <Row>
              <Input
                value={values.symbol}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.symbol}
                touched={touched.symbol}
                name="kind"
                type="text"
                addClass={["col-md-5", "col-xs-12"]}
              />
              <Input
                value={values.decimal_place}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.decimal_place}
                touched={touched.decimal_place}
                name="fx_euro"
                type="text" //
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
