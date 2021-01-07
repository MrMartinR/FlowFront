// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { Fragment, useEffect, useState } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { withFormik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "../../../sharedComponents/searchSelect";
import { Input } from "../../../sharedComponents/inputShared";
import { Avatar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


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
    icon: Yup.string()
      .required('An Icon is required'),
      // .nullable(),
    currency: Yup.array()
      .min(1),
      // .required('Currency is required'),
      // .nullable(),
    countries: Yup.array()
      .min(1),
      // .required('Country is required'),
      // .nullable(),
    createAccountFunc: null,
  }),
  enableReinitialize: true,
  mapPropsToValues: ({ account, saveAccount }) => {
    return {
      id: account.id,
      name: account.name,
      category: account.category,
      icon: account.icon,
      countries: account.country_id, //countryMap
      currency: account.currency_id, //currencyMap
      createAccountFunc: saveAccount,
    };
  },

  handleSubmit: (values, { setSubmitting }) => {
    const payload = {
      ...values,
      countries: values.countries.map((t) => t.value),
      currency: values.currency.map((t) => t.value),
    };
    values.createAccountFunc({
      name: payload.name,
      category: payload.category,
      // icon: payload.icon,
      country_id: payload.countries,
      currency_id: payload.currency,
    }, ()=>{
      alert("New account has been created!");
      setSubmitting(false);
    })
    // dispatch(AccountActions.createAccount({
    //   name: payload.name,
    //   category: payload.category,
    //   icon: payload.icon,
    //   country_id: payload.country_id,
    //   currency_id: payload.currency_id,
    // }))
    
  },
  displayName: "MyForm",
});


export const AccountEditForm = (props) => {

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
    // actionsLoading,
    onHide,
    currencyTable,
    countriesTable,
  } = props;

  useEffect(() => {
    if (currencyTable && countriesTable) {
      let selecData = {
        countries: [],
        currencies: [],
      }

      currencyTable.map((data) => {
        selecData.currencies.push({
          value: data.id, 
          label: data.name
        })
        return null;
      });

      countriesTable.map((data) => {
        selecData.countries.push({
          value: data.id, 
          label: data.name
        })
        return null;
      });

      // console.log("SELECTION DATA: ", selecData);
      setSelectionData(selecData)

    }
  }, [currencyTable, countriesTable])

  const [ iconData, setIconData ] = useState(null)
  const [ selectionData, setSelectionData ] = useState(null)

  const classes = useStyles();
  
  const getUrlFromSvgString = (string) => {
    let blob = new Blob([string], {type: 'image/svg+xml'});
    let url = URL.createObjectURL(blob);
    return url;
  }

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
        data = data.replace(/(\r\n|\n|\r)/gm, "");
        setFieldValue('icon', data)
      }
      // console.log(data);
      setIconData(data)
    } 
      
    fr.readAsText(e.target.files[0]); 
  }

  return (
    <Fragment>
      <Modal.Body className="overlay overlay-block">
        {/* {actionsLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-success" />
          </div>
        )} */}
        {/* <form onSubmit={handleSubmit}> */}
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
                <Avatar
                  className={classes.bigAvatar}
                  src={iconData ? getUrlFromSvgString(iconData) : null}
                  />
                <input
                  name={"icon"}
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
                list={selectionData ? selectionData.countries : []}
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
                list={selectionData ? selectionData.currencies : []}
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