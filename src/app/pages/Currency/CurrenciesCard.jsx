/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Card, CardHeader } from '@material-ui/core'
import { Table } from '@material-ui/core'
import { TableBody } from '@material-ui/core'
import { TableHead } from '@material-ui/core'
import { TableRow } from '@material-ui/core'
import { TableCell } from '@material-ui/core'
import axios from 'axios'
/* eslint-disable  no-restricted-imports */
import { withStyles, makeStyles } from '@material-ui/styles'
import { API_URL } from '../../../redux/utils'
import { addCurrency, CurrencySchema, currencyInitialValues } from '../../actions/currencyActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CurrencyForm from './CurrencyForm'
import CustomizedSnackbars from '../../utils/snackbar'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}))
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)

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
        'access-token': headerPara.authToken,
        client: headerPara.client,
        uid: headerPara.user.fullname,
        expiry: headerPara.expiry,
      },
    })
  }

  useEffect(() => {
    // Update the document title using the browser API
    getAllCurrencies(props.auth)
      .then((res) => {
        var resData = res.data
        if (resData.success) {
          setRows(resData.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const [rows, setRows] = useState([])
  const [submitting, setSubmitting] = useState(false)

  const classes = useStyles()
  const formMethods = useForm({
    resolver: yupResolver(CurrencySchema),
    defaultValues: currencyInitialValues,
  })

  const onSubmit = ({ symbol, code, name, kind, decimal_places }) => {
    setTimeout(() => {
      var formvalues = {
        symbol,
        code,
        name,
        kind,
        decimal_places,
      }
      addCurrency(props.auth, formvalues)
        .then((res) => {
          if (res.status === 200) {
            getAllCurrencies(props.auth)
              .then((res) => {
                setSnackState({
                  message: 'Currency Added!',
                  open: true,
                  variant: 'success',
                })
                const resData = res.data
                if (resData.success) {
                  setRows(resData.data)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
          setSubmitting(false)
        })
        .catch(() => {
          console.log('error')
          setSubmitting(false)
        })
    }, 1000)
  }

  const [snackState, _setSnackState] = useState({
    message: '',
    variant: 'success',
    open: false,
  })

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState })
  }

  return (
    <Card>
      <CustomizedSnackbars
        {...snackState}
        setSnackState={setSnackState}
        handleClose={() => {
          setSnackState({ open: false })
        }}
      />
      <CardHeader title="Currencies list">
        <button
          type="button"
          className="btn btn-primary"
          onClick={formMethods.handleSubmit(onSubmit)}
          disabled={submitting}
        >
          New Currency
        </button>
        <CurrencyForm {...props} formMethods={formMethods} initialValues={currencyInitialValues} />
      </CardHeader>
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
              <StyledTableCell align="left">{row.decimal_places}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
