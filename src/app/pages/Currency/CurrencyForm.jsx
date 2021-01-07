import React from "react";
/* eslint-disable  no-restricted-imports */ 
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// import * as Yup from "yup";
import { FormControl, TextField } from "@material-ui/core";

const CurrencyForm = (props) => {
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

  return (
    <div className="currency_form" id="kt_add_currency_form">
      <form className="form fv-plugins-bootstrap fv-plugins-framework">
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-name-dense`}
            label="Name"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name={"name"}
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
            id={`outlined-code-dense`}
            label="Code"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="code"
            {...formik.getFieldProps("code")}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.code}</div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-decimal_places-dense`}
            label="Decimal Places"
            type="number"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="decimal_places"
            {...formik.getFieldProps("decimal_places")}
          />
          {formik.touched.decimal_places && formik.errors.decimal_places ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">
                {formik.errors.decimal_places}
              </div>
            </div>
          ) : null}
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-kind-dense`}
            label="Type"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="kind"
            {...formik.getFieldProps("kind")}
          />
          {formik.touched.kind && formik.errors.kind ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.kind}</div>
            </div>
          ) : null}
        </FormControl>
        {/* <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-fx_eur-dense`}
            label="fx eur"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="fx_eur"
            {...formik.getFieldProps("fx_eur")}
          />
          {formik.touched.fx_eur && formik.errors.fx_eur ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.fx_eur}</div>
            </div>
          ) : null}
        </FormControl> */}
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-symbol-dense`}
            label="Symbol"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="symbol"
            {...formik.getFieldProps("symbol")}
          />
          {formik.touched.symbol && formik.errors.symbol ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.symbol}</div>
            </div>
          ) : null}
        </FormControl>
      </form>
    </div>
  );
};

export default CurrencyForm;
