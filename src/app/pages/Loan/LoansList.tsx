import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core/'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'

import { fetchLoansData } from './state/loansActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'air', headerName: 'Air', width: 180 },
  { field: 'country', headerName: 'Country', width: 180 },
  { field: 'currency', headerName: 'Currency', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 180 },
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'code', headerName: 'Code', width: 180 },
  { field: 'date_issued', headerName: 'Date issued', width: 180 },
  { field: 'date_listed', headerName: 'Date listed', width: 180 },
  { field: 'date_maturity', headerName: 'Maturity date', width: 180 },
  { field: 'description', headerName: 'Description', width: 180 },
  { field: 'dti_rating', headerName: 'Dti rating', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'installment', headerName: 'Installment', width: 180 },
  { field: 'internal_code', headerName: 'Internal code', width: 180 },
  { field: 'notes', headerName: 'Notes', width: 180 },
  { field: 'originator', headerName: 'Originator', width: 180 },
  { field: 'platform', headerName: 'Platform', width: 180 },
  { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'security_details', headerName: 'Security details', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
] as any

const LoansList = (props: any) => {
  const { fetchLoansData } = props
  const { loansData = [], loading } = props.loans
  const [data, setData] = React.useState([] as any)

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt['id'] = element.id
      dt['name'] = element.attributes.name
      dt['air'] = element.attributes.air
      dt['country'] = element.attributes.country.name
      dt['currency'] = element.attributes.currency.name
      dt['amortization'] = element.attributes.amortization
      dt['amount'] = element.attributes.amount
      dt['borrower'] = element.attributes.borrower
      dt['borrower_type'] = element.attributes.borrower_type
      dt['category'] = element.attributes.category
      dt['code'] = element.attributes.code
      dt['date_issued'] = element.attributes.date_issued
      dt['date_listed'] = element.attributes.date_listed
      dt['date_maturity'] = element.attributes.date_maturity
      dt['description'] = element.attributes.description
      dt['dti_rating'] = element.attributes.dti_rating
      dt['gender'] = element.attributes.gender
      dt['installment'] = element.attributes.installment
      dt['internal_code'] = element.attributes.internal_code
      dt['notes'] = element.attributes.notes
      dt['originator'] = element.attributes.originator
      dt['platform'] = element.attributes.platform
      dt['protection_scheme'] = element.attributes.protection_scheme
      dt['rating'] = element.attributes.rating
      dt['security_details'] = element.attributes.security_details
      dt['status'] = element.attributes.status
      dt['xirr'] = element.attributes.xirr
      data.push(dt)
    })
    return data
  }

  useEffect(() => {
    fetchLoansData()
  }, [fetchLoansData])

  useEffect(() => {
    setData(processData(loansData))
  }, [loansData])

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)

  return (
    <>
      {loading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <Typography variant="h3">Loans</Typography>
          <Grid container direction="column">
            <Card>
              <CardContent>
                <div style={{ height: 600, width: '100%' }}>
                  <XGrid
                    rows={data}
                    columns={columns}
                    disableMultipleSelection={true}
                    onRowClick={handleClick}
                    loading={true}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    loans: state.loans,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchLoansData: () => dispatch(fetchLoansData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoansList)
