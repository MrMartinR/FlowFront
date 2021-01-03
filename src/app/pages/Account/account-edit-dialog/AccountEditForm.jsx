// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Fragment, useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "../../../sharedComponents/searchSelect";
import { Input } from "../../../sharedComponents/inputShared";
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    account: { id, name, category, icon },
    // account: { id, name, category, icon, country, currency },
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

const useStyles = makeStyles({
  avatarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  bigAvatar: {
    margin: 10,
    width: "10rem",
    height: "10rem",
  },
  input: {
    display: 'none'
  }
});


export const AccountEditForm = (props) => {
  
  const getUrlFromSvgString = (string) => {
    let blob = new Blob([string], {type: 'image/svg+xml'});
    let url = URL.createObjectURL(blob);
    return url;
  }
  const classes = useStyles();
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
    onHide,
  } = props;

  const [ iconData, setIconData ] = useState(null)

  const fileUploaded = (e) => {
    // console.log(e.target.files);
    var fr=new FileReader(); 
    fr.onload=function(){ 
      // console.log("INN");
      // console.log(fr.result);
      let data = fr.result;
      let index = data.indexOf("<svg");
      if (index < 0) {
        return;
      }
      if (index !== 0) {
        data = data.substring(index) // removing extra text from the start of file.
      }
      // console.log(data);
      setIconData(data)
    } 
      
    fr.readAsText(e.target.files[0]); 
  }

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
              <Col sm={4} className={classes.avatarContainer}>
                {iconData ? 
                  <Avatar
                    className={classes.bigAvatar}
                    src={getUrlFromSvgString(iconData)}
                    /> 
                    :
                  <Avatar
                    className={classes.bigAvatar}
                    />
                }
                <input
                  accept="image/svg+xml"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  onChange={fileUploaded}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                {/* <Image src="/static/images/avatar/1.jpg" thumbnail /> */}
              </Col>
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
                addClass={["col-md-8", "col-xs-12"]}
              />
            </Row>
            <Row>
              <MultiSelect
                value={values.currency}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.currency}
                touched={touched.currency}
                multi={true}
                name="currency"
                addClass={["col-md-8", "col-xs-12"]}
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

export const MyEnhancedAccountForm = formikEnhancer(AccountEditForm);
