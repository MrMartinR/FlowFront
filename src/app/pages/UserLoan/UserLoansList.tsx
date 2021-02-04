import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core/'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'

import { fetchUserLoansData } from './state/userLoansActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Id', width: 180 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 180 },
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'date_issued', headerName: 'Date issued', width: 180 },
  { field: 'date_listed', headerName: 'Date listed', width: 180 },
  { field: 'date_maturity', headerName: 'Maturity date', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'installment', headerName: 'Installment', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
  { field: 'position', headerName: 'Position', width: 180 },
  { field: 'investment_amount', headerName: 'Investment amount', width: 180 },
  { field: 'date_in', headerName: 'Date in', width: 180 },
  { field: 'date_out', headerName: 'Date out', width: 180 },
  { field: 'loan_id', headerName: 'Loan Id', width: 180 },
  { field: 'invest_mode', headerName: 'Invest mode', width: 180 },
] as any

const UserLoansList = (props: any) => {
  const { userLoansData, loading } = props.userLoans
  const { fetchUserLoansData } = props
  const [data, setData] = React.useState([] as any)

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt['id'] = element.id
      dt['xirr'] = element.xirr
      dt['market'] = element.market
      dt['invest_mode'] = element.invest_mode
      dt['position'] = element.position
      dt['investment_amount'] = element.investment_amount
      dt['date_in'] = element.date_in
      dt['date_out'] = element.date_out
      dt['loan_id'] = element.loan.id
      dt['name'] = element.loan.name
      dt['status'] = element.loan.status
      dt['rating'] = element.loan.rating
      dt['borrower_type'] = element.loan.borrower_type
      dt['category'] = element.loan.category
      dt['amount'] = element.loan.amount
      dt['borrower'] = element.loan.borrower
      dt['date_listed'] = element.loan.date_listed
      dt['date_issued'] = element.loan.date_issued
      dt['date_maturity'] = element.loan.date_maturity
      dt['amortization'] = element.loan.amortization
      dt['installment'] = element.loan.installment

      data.push(dt)
    })
    return data
  }

  useEffect(() => {
    fetchUserLoansData()
  }, [fetchUserLoansData])

  useEffect(() => {
    setData(processData(userLoansData))
  }, [userLoansData])

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
          <Typography variant="h3">My Loans</Typography>
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
    userLoans: state.userLoans,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUserLoansData: () => dispatch(fetchUserLoansData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLoansList)
