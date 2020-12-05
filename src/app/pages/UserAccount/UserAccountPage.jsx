import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardHeaderToolbar,
  CardBody,
} from "../../../_metronic/_partials/controls";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Col, Row } from "react-bootstrap";
import { getUserAccounts } from "../../actions/userAccountActions";

const UserAccountPage = (props) => {
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
      minWidth: 400,
    },
  }))();

  const [accounts, setAccounts] = React.useState([1]);
  React.useEffect(() => {
    getUserAccounts(props.auth)
      .then((res) => {
        var resData = res.data;
        if (resData.success) {
          setAccounts(resData.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.auth]);

  return (
    <>
      <div className="row h-100">
        <Card className="m-0 w-100 h-100">
          <CardHeader title="User Accounts">
            <CardHeaderToolbar></CardHeaderToolbar>
          </CardHeader>
          <CardBody>
            <Row>
              <Col lg="5">
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        {accounts.map((acc, key) => {
                          return (
                            <StyledTableCell key={key} align="left">
                              {acc}
                            </StyledTableCell>
                          );
                        })}
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Col>
              <Col lg="7">
                <Paper className={classes.root}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="left">Name</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell align="left">name</StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(UserAccountPage);
