import React, { useEffect, useMemo, useState } from "react";
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
import { useCurrenciesUIContext } from "./CurrenciesUIContext";
import { withStyles, makeStyles } from "@material-ui/styles";
import { API_URL } from "../../modules/Auth/_redux/authCrud";

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
  const currenciesUIContext = useCurrenciesUIContext();
  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      newCurrencyButtonClick: currenciesUIContext.newCurrencyButtonClick,
    };
  }, [currenciesUIContext]);

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
        console.log("resData: ", resData);
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

  return (
    <Card>
      <CardHeader title="Currencies list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            // onClick={currenciesUIProps.newCurrencyButtonClick}
          >
            New Currency
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Type</StyledTableCell>
                <StyledTableCell align="right">ISO Code</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Currency</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.type}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.code}</StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.symbol}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        {/* <CurrenciesFilter /> */}
        {/* {currenciesUIProps.ids.length > 0 && <CurrenciesGrouping />} */}
        {/* <CurrenciesTable /> */}
      </CardBody>
    </Card>
  );
}