import React, { useMemo, useState } from "react";
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

export function CurrenciesCard() {
  const currenciesUIContext = useCurrenciesUIContext();
  const currenciesUIProps = useMemo(() => {
    return {
      ids: currenciesUIContext.ids,
      newCurrencyButtonClick: currenciesUIContext.newCurrencyButtonClick,
    };
  }, [currenciesUIContext]);

  const [rows, setRows] = useState([
    {
      id: 1,
      continent: "test 1",
      iso_code: "112",
      name: "test_1",
      currency: {
        symbol: "s1",
      },
    },
    {
      id: 2,
      continent: "test 2",
      iso_code: "114",
      name: "test_2",
      currency: {
        symbol: "s2",
      },
    },
  ]);
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
                <StyledTableCell>Flag</StyledTableCell>
                <StyledTableCell align="right">ISO Code</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Currency</StyledTableCell>
                <StyledTableCell align="right">Continent</StyledTableCell>
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
                  <StyledTableCell align="right">
                    {row.continent}
                  </StyledTableCell>
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
