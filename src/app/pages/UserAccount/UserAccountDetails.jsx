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
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/styles";
import { Col, Row } from "react-bootstrap";
import { Avatar, ListItemAvatar, ListItemText } from "@material-ui/core";
import { getUrlFromSvgString } from "../../utils/AccountsUtils";

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
  console.log("transactions: ", transactions);

  useEffect(() => {
    const currTransaction = allTransactions.filter(
      (t) => t.user_account_id === selectedUserAccount.id
    );
    setTransactions(currTransaction);
  }, [selectedItemIndex, selectedUserAccount]);

  console.log("selectedUserAccount: ", selectedUserAccount);
  return (
    <Card style={{ marginLeft: "1rem", width: "100%", minWidth: "400px" }}>
      <CardHeader>
        <CardHeaderToolbar className="w-100">
          <Row className="w-100">
            <Col md="2">
              <Row>
                <ListItemAvatar>
                  <Avatar
                    style={{
                      height: "40px",
                      width: "40px",
                    }}
                    alt={selectedUserAccount.name}
                    src={
                      selectedUserAccount.account &&
                      selectedUserAccount.account.icon
                        ? getUrlFromSvgString(selectedUserAccount.account.icon)
                        : null
                    }
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  classes={makeStyles((theme) => {
                    console.log("theme: ", theme);
                    return {
                      root: {
                        fontSize: theme.typography.overline.fontSize,
                      },
                    };
                  })()}
                  primary={selectedUserAccount.name}
                />
              </Row>
            </Col>
            <Col>
              <button
                type="button"
                className="btn btn-primary"
                // onClick={formik.handleSubmit}
                // disabled={formik.isSubmitting}
              >
                New Transactiion
              </button>
            </Col>
          </Row>
        </CardHeaderToolbar>
      </CardHeader>

      <CardBody>
        <Paper className={classes.root}>
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
              {transactions.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">{row.category}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.description}
                  </StyledTableCell>
                  <StyledTableCell scope="row">{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </CardBody>
    </Card>
  );
};
