import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSubheader } from "../../_metronic/layout";
import { useFormik } from "formik";
import { connect } from "react-redux";
import "./Page.css";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import CountryForm from "./Country/CountryForm";
import {
  addCountry,
  CountrySchema,
  getAllCountries,
} from "../actions/countryActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

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

const CountryPage = (props) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    getAllCountries(props.auth)
      .then((res) => {
        var resData = res.data;
        if (resData.success) {
          setRows(resData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.auth]);

  const classes = useStyles();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Country Page");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    continent: "",
    flag: "",
    iso_code: "",
    name: "",
    currency_id: "",
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CountrySchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      console.log("loading: ", loading);
      setTimeout(() => {
        var formvalues = {
          continent: values.continent,
          flag: values.flag,
          iso_code: values.iso_code,
          name: values.name,
          currency_id: values.currency_id,
        };
        addCountry(props.auth, formvalues)
          .then((res) => {
            disableLoading();
            if (res.status === 200) {
              getAllCountries(props.props)
                .then((res) => {
                  var resData = res.data;
                  if (resData.success) {
                    props.setRows(resData.data);
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
            disableLoading();
            setSubmitting(false);
          });
      }, 1000);
    },
  });

  return (
    <>
      <Card>
        <CardHeader title="Countries list">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              Add New Country
            </button>
          </CardHeaderToolbar>
          <CountryForm {...props} formik={formik} />
        </CardHeader>
        <CardBody>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Continent</StyledTableCell>
                  <StyledTableCell align="right">ISO Code</StyledTableCell>
                  <StyledTableCell align="right">Name</StyledTableCell>
                  <StyledTableCell align="right">Currency</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.continent}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.iso_code}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.currency.symbol}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </CardBody>
      </Card>
      <Card></Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(CountryPage);
