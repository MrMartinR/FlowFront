//[REV] failed to refactor to tsx

import React, { useEffect, useState } from 'react';
// import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import { useSubheader } from '../../../_metronic/layout';
import { useFormik } from 'formik';
// import * as Yup from "yup";
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Card } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

import { addCurrency, currencyInitialValues, CurrencySchema, getAllCurrencies } from '../../actions/currencyActions';

// const SAPI_URL = "";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}));

const CurrencyPage = (props) => {
    const [rows, setRows] = useState([]);
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
    }, [props.auth]);

    const classes = useStyles();
    const suhbeader = useSubheader();
    suhbeader.setTitle('Currency Page');

    return (
        <>
            <CurrencyForm props={props.auth} setRows={setRows} />
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
                                <StyledTableCell align="right">{row.decimal_places}</StyledTableCell>
                                <StyledTableCell align="right">{row.fx_eur}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
        </>
    );
};

const useFormStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
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

    const enableLoading = () => {
        setLoading(true);
    };

    const disableLoading = () => {
        setLoading(false);
    };

    const formik = useFormik({
        initialValues: currencyInitialValues,
        validationSchema: CurrencySchema,
        onSubmit: (values, { setStatus, setSubmitting }) => {
            enableLoading();
            setTimeout(() => {
                var formvalues = {
                    kind: values.type,
                    code: values.code,
                    symbol: values.name,
                    name: values.symbol,
                    decimal_places: values.decimal_places,
                    fx_eur: values.fx_eur,
                };
                addCurrency(props, formvalues)
                    .then((res) => {
                        disableLoading();
                        if (res.status === 200) {
                            props.setRows(res.data);
                        }
                        setSubmitting(false);
                    })
                    .catch(() => {
                        console.log('error');
                        disableLoading();
                        setSubmitting(false);
                    });
            }, 1000);
        },
    });

    return (
        <div className="currency_form" id="kt_add_currency_form">
            <Card>
                <Card.Body>
                    {/*begin::Form*/}
                    <form onSubmit={formik.handleSubmit} className="form fv-plugins-bootstrap fv-plugins-framework">
                        {formik.status ? (
                            <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                                <div className="alert-text font-weight-bold">{formik.status}</div>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="makeStyles-container-3 justify-content-end">
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                                id="kt_add_currency_submit"
                                disabled={formik.isSubmitting}
                                className={classes.button}
                            >
                                <span>+ Add Currency</span>
                                {loading && <span className="ml-3 spinner spinner-white"></span>}
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
                                {...formik.getFieldProps('code')}
                            />
                            {formik.touched.code && formik.errors.code ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.code}</div>
                                </div>
                            ) : null}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-name-dense"
                                label="Name"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                name="name"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.name}</div>
                                </div>
                            ) : null}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-symbol-dense"
                                label="Symbol"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                name="symbol"
                                {...formik.getFieldProps('symbol')}
                            />
                            {formik.touched.symbol && formik.errors.symbol ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.symbol}</div>
                                </div>
                            ) : null}
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
                                {...formik.getFieldProps('decimal_places')}
                            />
                            {formik.touched.decimal_places && formik.errors.decimal_places ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.decimal_places}</div>
                                </div>
                            ) : null}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-fx-dense"
                                label="Fx_Eur"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                name="fx_eur"
                            />
                            {formik.touched.fx_eur && formik.errors.fx_eur ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.fx_eur}</div>
                                </div>
                            ) : null}
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="outlined-select-type"
                                select
                                label="Type"
                                className={clsx(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                value={formik.values.type}
                                {...formik.getFieldProps('type')}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                            >
                                <MenuItem value={'Crypto'}>Crypto</MenuItem>
                                <MenuItem value={'Fiat'}>Fiat</MenuItem>
                            </TextField>
                            {formik.touched.type && formik.errors.type ? (
                                <div className="fv-plugins-message-container">
                                    <div className="fv-help-block">{formik.errors.type}</div>
                                </div>
                            ) : null}
                        </FormControl>
                    </form>
                    {/*end::Form*/}
                </Card.Body>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(CurrencyPage);
