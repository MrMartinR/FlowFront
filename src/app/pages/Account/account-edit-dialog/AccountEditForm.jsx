// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../_metronic/_partials/controls";
import SearchSelect from '../../../sharedComponents/searchSelect'

// Validation schema
const AccountEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  category: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Category is required"),
  icon: Yup.string(),
  currency: Yup.string().required('Currency is required!'),
  country: Yup.string().required('Country is required!'),
});

export function AccountEditForm({
  saveAccount,
  account,
  actionsLoading,
  onHide,
}) {
  console.log('actionsLoading', actionsLoading)
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={account}
        validationSchema={AccountEditSchema}
        onSubmit={(values) => {
          saveAccount(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block">
              {/* {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )} */}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Name */}
                  <div className="col-lg-4">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  {/* Category */}
                  <div className="col-lg-4">
                    <Field
                      name="category"
                      component={Input}
                      placeholder="Category"
                      label="Category"
                    />
                  </div>
                  {/* Icon */}
                  <div className="col-lg-4">
                    <img src="img_avatar.png" alt="Avatar" className="avatar" />
                  </div>
                </div>
                <div className="form-group row">
                  {/* currency */}
                  <div className="col-lg-4">
                    <Field
                      name="currency.id"
                      name="currency.name"
                      component={Input}
                      label="Currency"
                    />
                  </div>
                  {/* Country */}
                  <div className="col-lg-4">
                    <Field
                      name="country.id"
                      name="country.name"
                      component={Select}
                      label="Country"
                      options={() => alert("ies")}
                    />
                  </div>
                </div>
              </Form>
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
          </>
        )}
      </Formik>
    </>
  );
}
