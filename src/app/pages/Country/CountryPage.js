// [REV] failed to refactor to tsx

import React, { useEffect, useState } from 'react'
import { withStyles,makeStyles } from '@material-ui/core'
import {Table} from '@material-ui/core'
import {TableBody} from '@material-ui/core'
import {TableCell} from '@material-ui/core'
import {TableHead} from '@material-ui/core'
import {TableRow} from '@material-ui/core'
import { useFormik } from 'formik'
import { connect } from 'react-redux'
import { Avatar } from '@material-ui/core'
import {
  Card,
  CardHeader,
} from '@material-ui/core'
import CountryForm from './CountryForm'
import { addCountry, CountrySchema, getAllCountries } from './countryActions'
import { toAbsoluteUrl } from '../../../_metronic/_helpers'
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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)

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

const CountryPage = (props) => {
  const [rows, setRows] = useState([])
  const { auth } = props
  useEffect(() => {
    // Update the document title using the browser API
    getAllCountries(auth)
      .then((res) => {
        const resData = res.data
        if (resData.success) {
          setRows(resData.data)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [auth])

  const classes = useStyles()

  const initialValues = {
    continent: '',
    flag: '',
    iso_code: '',
    name: '',
    currency_id: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: CountrySchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        const formvalues = {
          continent: values.continent,
          flag: values.flag,
          iso_code: values.iso_code,
          name: values.name,
          currency_id: values.currency_id,
        }
        addCountry(auth, formvalues)
          .then((res) => {
            if (res.status === 200) {
              getAllCountries(auth)
                .then(() => {
                  const resData = res.data
                  if (resData.success) {
                    setSnackState({
                      message: 'Country Added!',
                      open: true,
                      variant: 'success',
                    })
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
    },
  })

  const [snackState, _setSnackState] = useState({
    message: '',
    variant: 'success',
    open: false,
  })

  const setSnackState = (newState) => {
    _setSnackState({ ...snackState, ...newState })
  }

  return (
    <>
      {/* Add Country Assistant */}
      <Card>
        <CustomizedSnackbars
          {...snackState}
          setSnackState={setSnackState}
          handleClose={() => {
            setSnackState({ open: false })
          }}
        />
        <CardHeader title="Add Country Assistant">
          <CountryForm {...props} formik={formik} />
            <button
              type="button"
              className="btn btn-primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              Add New Country
            </button>
        </CardHeader>
      </Card>

      {/* countries list */}
      <Card>
        <CardHeader title="Countries list" />
        {/* <CardBody> */}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Flag</StyledTableCell>
                <StyledTableCell align="left">ISO Code</StyledTableCell>
                <StyledTableCell>Continent</StyledTableCell>
                <StyledTableCell align="left">Currency</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="left">{row.name}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Avatar
                      style={{
                        height: '40px',
                        width: '40px',
                        border: '2px solid #f3f3f3',
                        float: 'left',
                      }}
                      variant="rounded"
                      alt={row.iso_code}
                      src={toAbsoluteUrl(
                        `/media/svg/flags/${row.iso_code.toLowerCase()}.svg`,
                      )}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.iso_code}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.continent}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {row.currency && row.currency.code ? row.currency.code : ''}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        {/* </CardBody> */}
      </Card>
      <Card />
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(CountryPage)
