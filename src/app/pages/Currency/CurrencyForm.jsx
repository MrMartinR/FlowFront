import React from "react";
/* eslint-disable  no-restricted-imports */
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import * as Yup from "yup";
import { FormControl, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const CurrencyForm = (props) => {
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
  const currencyForm = Yup.object().shape({
    name: Yup.string().required("Required"),
    code: Yup.string().required("Required"),
    symbol: Yup.string().required("Required"),
    decimal_places: Yup.string().required("Required"),
    kind: Yup.string().required("Required"),
  });

  const classes = useFormStyles();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(currencyForm),
  });

  const onSubmit = (event) => {};

  return (
    <div className="currency_form" id="kt_add_currency_form">
      <form
        className="form fv-plugins-bootstrap fv-plugins-framework"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-name-dense`}
            label="Name"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name={"name"}
            inputRef={register()}
          />
          <span> {errors.name && errors.name.message}</span>
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
            inputRef={register()}
          />
          <span> {errors.code && errors.code.message}</span>
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
            inputRef={register()}
          />
          <span> {errors.decimal_places && errors.decimal_places.message}</span>
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
            inputRef={register()}
          />
          <span> {errors.kind && errors.kind.message}</span>
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            id={`outlined-symbol-dense`}
            label="Symbol"
            type="text"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            name="symbol"
            inputRef={register()}
          />

          <span> {errors.symbol && errors.symbol.message}</span>
        </FormControl>
      </form>
    </div>
  );
};

export default CurrencyForm;
