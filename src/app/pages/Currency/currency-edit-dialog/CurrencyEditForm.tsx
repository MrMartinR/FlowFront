import React, { Fragment } from "react";
import { Modal, Container, Row, Col, Image } from "react-bootstrap";
import * as Yup from "yup";
import { MultiSelect } from "../../../sharedComponents/searchSelect";
import { Input } from "../../../sharedComponents/inputShared";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const CurrencyEditForm = (props: any) => {
  const {
    values,
    touched,
    setFieldValue,
    setFieldTouched,
    actionsLoading,
    onHide,
  } = props;

  const ValidationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Required"),
    acceptTerms: Yup.bool().required(
      "You must accept the terms and conditions"
    ),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = () => {};

  return (
    <Fragment>
      <Modal.Body className="overlay overlay-block">
        {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )}
        <form>
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
                  addClass={["col-md-5", "col-xs-12"]}
                />
                <Input
                  value={values.category}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  error={errors.category}
                  touched={touched.category}
                  name="category"
                  type="text"
                  addClass={["col-md-5", "col-xs-12"]}
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
                addClass={["col-md-5", "col-xs-12"]}
              />
              <Input
                value={values.category}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.category}
                touched={touched.category}
                name="category"
                type="text"
                addClass={["col-md-5", "col-xs-12"]}
              />
              <MultiSelect
                value={values.contries}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.contries}
                touched={touched.contries}
                name="contries"
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
            </Row>
          </Container>
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
          onClick={handleSubmit(onSubmit)}
          className="btn btn-primary btn-elevate"
        >
          Save
        </button>
      </Modal.Footer>
    </Fragment>
  );
};

export const MyEnhancedCurrencyForm = CurrencyEditForm;
