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
import { withStyles, makeStyles } from "@material-ui/styles";
import { Col, Row } from "react-bootstrap";
import { Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
import { hasValue } from "./UserAccountsUtils";


export const UserAccountsDetails = ({
  selectedItemIndex,
  allTransactions = [],
  selectedUserAccount,
}) => {
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
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto",
    },
    table: {
      minWidth: 700,
    },
  }))();

  const [transactions, setTransactions] = useState([]);
  let value = 0;
  let balance = 0;
  transactions
    .map(({ amount }) => amount)
    .forEach((amount) => {
      if (hasValue(amount)) balance = +amount;
    });

  useEffect(() => {
    const currTransaction = allTransactions.filter(
      (t) => t.user_account_id === selectedUserAccount.id
    );
    setTransactions(currTransaction);
  }, [selectedItemIndex]);


  const showValue = (value, classes) => (
    <span className="symbol symbol-light-success">
      <span
        style={{
          width: "130px",
          height: "39px",
        }}
        className={`symbol-label font-size-h6 font-weight-bold ${classes}`}
      >
        {value}
      </span>
    </span>
  );

  return (
    <Card style={{ marginLeft: "1rem", width: "100%", minWidth: "400px" }}>
      <CardHeader className="pr-0 ">
        <CardHeaderToolbar className="w-100">
          <Row className="w-100">
            <Col md="4">
              <Row>
                {selectedUserAccount.account && (
                  <>
                    <ListItemAvatar>
                      <Avatar
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={selectedUserAccount.name}
                    />
                  </>
                )}
              </Row>
            </Col>
            <Col md="1">
              <button
                type="button"
                className="btn btn-primary"
                style={{
                  height: "39px",
                  width: "49px",
                }}
              >
                refresh
              </button>
            </Col>
            <Col md="2">{showValue(`Value: ${value}`)}</Col>
            <Col md="2">{showValue(`Balance: ${balance}`, "mr-3")}</Col>
            <Col md="3">
              <Row>
                <button type="button" className="btn btn-primary ml-4">
                  New Transactiion
                </button>
              </Row>
            </Col>
          </Row>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Category</StyledTableCell>
                <StyledTableCell align="left">Concept</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!transactions.length && (
                <StyledTableRow key={1}>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>No transaction found.</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </StyledTableRow>
              )}
              {transactions.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">
                    {row.date}
                    {row.category === "Expense" && (
                    "Expense icon"
                    )}
                    {["Out", "In"].includes(row.category) && (
                      "InOut"
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.category}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell scope="row">{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
      </CardBody>
    </Card>
  );
};