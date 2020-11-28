/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
// import { CurrenciesFilter } from "./currencies-filter/CurrenciesFilter";
// import { CurrenciesTable } from "./currencies-table/CurrenciesTable";
// import { CurrenciesGrouping } from "./currencies-grouping/CurrenciesGrouping";
// import { useCurrenciesUIContext } from "./CurrenciesUIContext";
import { withStyles, makeStyles } from "@material-ui/styles";
import { API_URL } from "../../modules/Auth/_redux/authCrud";
import {
  addCurrency,
  CurrencySchema,
  currencyInitialValues,
} from "../../actions/currencyActions";
import { useFormik } from "formik";
import CurrencyForm from "./CurrencyForm";
import CustomizedSnackbars from "../../utils/snackbar";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
}));
const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export function CurrenciesCard(props) {
  // const currenciesUIContext = useCurrenciesUIContext();
  // const currenciesUIProps = useMemo(() => {
  //   return {
  //     ids: currenciesUIContext.ids,
  //     newCurrencyButtonClick: currenciesUIContext.newCurrencyButtonClick,
  //   };
  // }, [currenciesUIContext]);

  const getAllCurrencies = (headerPara) => {
    return axios.get(`${API_URL}/api/v1/currencies?page=1`, {
      headers: {
        "access-token": headerPara.authToken,
        client: headerPara.client,
        uid: headerPara.user.fullname,
        expiry: headerPara.expiry,
      },
    });
  };

  useEffect(() => {
    // Update the document title using the browser API
    getAllCurrencies(props.auth)
      .then((res) => {
        var resData = res.data;
        if (resData.success) {
          setRows(resData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [rows, setRows] = useState([]);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: currencyInitialValues,
    validationSchema: CurrencySchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setTimeout(() => {
        var formvalues = {
          symbol: values.symbol,
          code: values.code,
          name: values.name,
          kind: values.kind,
          decimal_places: values.decimal_places,
        };
        addCurrency(props.auth, formvalues)
          .then((res) => {
            if (res.status === 200) {
              getAllCurrencies(props.auth)
                .then((res) => {
                  setSnackState({
                    message: "Currency Added!",
                    open: true,
                    variant: "success",
                  });
                  const resData = res.data;
                  if (resData.success) {
                    setRows(resData.data);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            setSubmitting(false);
          })
          .catch(() => {
            console.log("error");
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  const [snackState, _setSnackState] = useState({
    message: "",
    variant: "success",
    open: false,
  });

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState });
  };

  return (
    <Card>
      <CustomizedSnackbars
        {...snackState}
        setSnackState={setSnackState}
        handleClose={() => {
          setSnackState({ open: false });
        }}
      />
      <CardHeader title="Currencies list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            New Currency
          </button>
        </CardHeaderToolbar>
        <CurrencyForm
          {...props}
          formik={formik}
          initialValues={currencyInitialValues}
        />
      </CardHeader>
      <CardBody>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">ISO Code</StyledTableCell>
                <StyledTableCell align="left">Symbol</StyledTableCell>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="left">Decimal Places</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">{row.code}</StyledTableCell>
                  <StyledTableCell align="left">{row.symbol}</StyledTableCell>
                  <StyledTableCell scope="row">{row.type}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.decimal_places}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardBody>
    </Card>
  );
}
