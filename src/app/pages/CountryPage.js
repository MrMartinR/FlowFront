import React, { useEffect, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSubheader } from "../../_metronic/layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import "./Page.css";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import { API_URL } from "../modules/Auth/_redux/authCrud";

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

const getAllCountries = (headerPara) => {
  return axios.get(`${API_URL}/api/v1/countries?page=1`, {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};
const getAllCurrencies = (headerPara) => {
  return axios.get("/api/v1/currencies?page=1", {
    headers: {
      "access-token": headerPara.authToken,
      client: headerPara.client,
      uid: headerPara.user.fullname,
      expiry: headerPara.expiry,
    },
  });
};

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
  }, []);

  const classes = useStyles();
  const suhbeader = useSubheader();
  suhbeader.setTitle("Country Page");

  return (
    <>
      <Card>
        <CardHeader title="Countries list">
          <CardHeaderToolbar>
            <button
              type="button"
              className="btn btn-primary"
              // onClick={()=>{}}
            >
              Add New Country
            </button>
          </CardHeaderToolbar>
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

const addCountry = (headerPara, values) => {
  return axios.post(
    "/api/v1/countries",
    { country: values },
    {
      headers: {
        "access-token": headerPara.props.authToken,
        client: headerPara.props.client,
        uid: headerPara.props.user.fullname,
        expiry: headerPara.props.expiry,
      },
    }
  );
};

const initialValues = {
  continent: "",
  flag: "",
  iso_code: "",
  name: "",
  currency_id: "",
};
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

const CountryForm = (props) => {
  const classes = useFormStyles();
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    getAllCurrencies(props.props)
      .then((res) => {
        var resData = res.data;
        if (resData.success) {
          setCurrencies(resData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const CountrySchema = Yup.object().shape({
    continent: Yup.string()
      .min(2, "Minimum 2 symbols")
      .max(50, "Maximum 50 symbols")
      .required("This field is required"),
    flag: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("This field is required"),
    iso_code: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
    currency_id: Yup.string().required("This field is required"),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: CountrySchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        var formvalues = {
          continent: values.continent,
          flag: values.flag,
          iso_code: values.iso_code,
          name: values.name,
          currency_id: values.currency_id,
        };
        addCountry(props, formvalues)
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
    <div className="country_form" id="kt_add_country_form">
      <div className="makeStyles-container-3 justify-content-end float-right p-3">
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
      </div>

      {/* <Card> */}
      {/* <Card.Body> */}
      {/*begin::Form*/}
      {/* <form
            onSubmit={formik.handleSubmit}
            className="form fv-plugins-bootstrap fv-plugins-framework"
          >
            {formik.status ? (
              <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                <div className="alert-text font-weight-bold">
                  {formik.status}
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="makeStyles-container-3 justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                id="kt_add_country_submit"
                disabled={formik.isSubmitting}
                className={classes.button}
              >
                <span>+ Add Country</span>
                {loading && (
                  <span className="ml-3 spinner spinner-white"></span>
                )}
              </Button>
            </div>
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
                <MenuItem value={"Europe"}>Europe</MenuItem>
                <MenuItem value={"Asia"}>Asia</MenuItem>
                <MenuItem value={"Africa"}>Africa</MenuItem>
                <MenuItem value={"Australia"}>Australia</MenuItem>
                <MenuItem value={"North America"}>North America</MenuItem>
                <MenuItem value={"South America"}>South America</MenuItem>
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
                  <div className="fv-help-block">
                    {formik.errors.currency_id}
                  </div>
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
          
          </form> */}
      {/*end::Form*/}
      {/* </Card.Body> */}
      {/* </Card> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(CountryPage);
