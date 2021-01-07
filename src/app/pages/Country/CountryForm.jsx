/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
/* eslint-disable  no-restricted-imports */ 
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import * as Yup from "yup";
import { FormControl, MenuItem, TextField } from "@material-ui/core";
import { getAllCurrencies } from "../../actions/currencyActions";

const CountryForm = (props) => {
  const { formik } = props;
  const useFormStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    formControl: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    dense: {
      marginTop: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
    },
    menu: {
      width: 200,
    },
  }));

  const classes = useFormStyles();
  const [currencies, setCurrencies] = useState([]);

  React.useEffect(() => {
    getAllCurrencies(props.auth).then((res) => {
      const data = res.data;
      setCurrencies(data.data);
    });
  }, []);

  const continent = [
    "Europe",
    "Asia",
    "Africa",
    "Australia",
    "North America",
    "South America",
  ];

  return (
    <div className="country_form" id="kt_add_country_form">
      {/* <div className="makeStyles-container-3 justify-content-end float-right p-3">
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            id="kt_add_country_submit"
            disabled={formik.isSubmitting}
            className={classes.button}
          >
            <span>+ Add Country</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </Button>
        </div> */}

      {/* <Card> */}
      {/* <Card.Body> */}
      {/*begin::Form*/}
      <form
        // onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          ""
        )}
        {/* <div className="makeStyles-container-3 justify-content-end">
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              id="kt_add_country_submit"
              disabled={formik.isSubmitting}
              className={classes.button}
            >
              <span>+ Add Country</span>
              {loading && <span className="ml-3 spinner spinner-white"></span>}
            </Button>
          </div> */}
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-select-continent"
            select
            label="Continent"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={formik.values.continent}
            {...formik.getFieldProps("continent")}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {continent.map((c, idx) => {
              return (
                <MenuItem key={idx} value={c}>
                  {c}
                </MenuItem>
              );
            })}
          </TextField>
          {formik.touched.continent && formik.errors.continent ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.continent}</div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-select-currency"
            select
            label="Currency"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            value={formik.values.currency_id}
            {...formik.getFieldProps("currency_id")}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.symbol}
              </MenuItem>
            ))}
          </TextField>
          {formik.touched.currency_id && formik.errors.currency_id ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.currency_id}</div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-name-dense"
            label="Name"
            type=""
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.name}</div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-iso-dense"
            label="ISO Code"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="iso_code"
            {...formik.getFieldProps("iso_code")}
          />
          {formik.touched.iso_code && formik.errors.iso_code ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.iso_code}</div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id="outlined-symbol-dense"
            label="Flag"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="flag"
            {...formik.getFieldProps("flag")}
          />
          {formik.touched.flag && formik.errors.flag ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.flag}</div>
            </div>
          ) : null}
        </FormControl>
      </form>
      {/*end::Form*/}
      {/* </Card.Body> */}
      {/* </Card> */}
    </div>
  );
};

export default CountryForm;
