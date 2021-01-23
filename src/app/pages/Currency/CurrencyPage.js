import React, { useEffect, useState } from "react";
import { styles } from "@material-ui/core";
import clsx from "clsx";
import { Table } from "@material-ui/core";
import { TableBody } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { TableHead } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";
import { FormControl } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Card } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { useSubheader } from "../../../common/layout";

import {
  addCurrency,
  currencyInitialValues,
  CurrencySchema,
  getAllCurrencies,
} from "../../actions/currencyActions";
import { yupResolver } from "@hookform/resolvers/yup";

// const SAPI_URL = "";
const StyledTableCell = styles.withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = styles.withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = styles.makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));

const CurrencyPage = ({ auth }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    getAllCurrencies(auth)
      .then((res) => {
        const resData = res.data;
        if (resData.success) {
          setRows(resData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  const classes = useStyles();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Currency Page");

  return (
    <>
      <CurrencyForm props={auth} setRows={setRows} />
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell align="right">Code</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Symbol</StyledTableCell>
            <StyledTableCell align="right">Decimal Places</StyledTableCell>
            <StyledTableCell align="right">Fx_eur</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.type || row.kind}
              </StyledTableCell>
              <StyledTableCell align="right">{row.code}</StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.symbol}</StyledTableCell>
              <StyledTableCell align="right">
                {row.decimal_places}
              </StyledTableCell>
              <StyledTableCell align="right">{row.fx_eur}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const useFormStyles = styles.makeStyles((theme) => ({
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

const CurrencyForm = (props) => {
  const classes = useFormStyles();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(CurrencySchema),
    defaultValues: currencyInitialValues,
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const onSubmit = ({ type, code, name, symbol, decimal_places, fx_eur }) => {
    enableLoading();
    setTimeout(() => {
      const formvalues = {
        kind: type,
        code: code,
        symbol: name,
        name: symbol,
        decimal_places: decimal_places,
        fx_eur: fx_eur,
      };
      addCurrency(props, formvalues)
        .then((res) => {
          disableLoading();
          if (res.status === 200) {
            props.setRows(res.data);
          }
        })
        .catch(() => {
          console.log("error");
          disableLoading();
        });
    });
  };

  return (
    <div className="currency_form" id="kt_add_currency_form">
      <Card>
        <Card.Body>
          {/* begin::Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            <div className="makeStyles-container-3 justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                id="kt_add_currency_submit"
                disabled={formState.isSubmitting}
                className={classes.button}
              >
                <span>+ Add Currency</span>
                {loading && <span className="ml-3 spinner spinner-white" />}
              </Button>
            </div>

            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-code-dense"
                label="Code"
                type=""
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
                id="outlined-name-dense"
                label="Name"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                name="name"
                inputRef={register()}
              />
              <span> {errors.name && errors.name.message}</span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-symbol-dense"
                label="Symbol"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                name="symbol"
                inputRef={register()}
              />
              <span> {errors.symbol && errors.symbol.message}</span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-decimal-dense"
                label="Decimal Places"
                type="number"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                name="decimal_places"
                inputRef={register()}
              />
              <span>
                {" "}
                {errors.decimal_places && errors.decimal_places.message}
              </span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-fx-dense"
                label="Fx_Eur"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                name="fx_eur"
                inputRef={register()}
              />
              <span> {errors.fx_eur && errors.fx_eur.message}</span>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="outlined-select-type"
                select
                label="Type"
                className={clsx(classes.textField, classes.dense)}
                margin="dense"
                variant="outlined"
                inputRef={register()}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                <MenuItem value="Crypto">Crypto</MenuItem>
                <MenuItem value="Fiat">Fiat</MenuItem>
              </TextField>
              <span> {errors.type && errors.type.message}</span>
            </FormControl>
          </form>
          {/* end::Form */}
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CurrencyPage);
