import React from 'react'
import { Grid, CardHeader } from '@material-ui/core/'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Loan Id', width: 250 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'borrower', headerName: 'Borrower', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 150 },
  { field: 'date_issued', headerName: 'Issued', width: 150 },
  { field: 'date_listed', headerName: 'Listed', width: 150 },
  { field: 'date_maturity', headerName: 'Maturity', width: 150 },
  { field: 'amortization', headerName: 'Amortization', width: 150 },
  { field: 'installment', headerName: 'Installment', width: 150 },
  { field: 'code', headerName: 'Code', width: 150 },
  { field: 'xirr', headerName: 'Xirr', width: 150 },
  { field: 'air', headerName: 'Air', width: 100 },
] as any

// country_id: "42d74c5e-b608-4d59-9a2f-9d2c46047c0c"
// created_at: "2019-02-27T19:50:45.000Z"
// created_by: "499ad3c2-97d2-441f-8d00-77acc2139c70"
// currency_id: "13fb3c72-4227-4fa2-849a-b597a03d4494"

const PlatformLoans = (props: any) => {
  return (
    <Grid xs={12}>
      <Grid container direction="column">
        <div style={{ height: 600, width: '100%' }}>
          <XGrid rows={props.platformLoans} columns={columns} disableMultipleSelection={true} loading={true} />
        </div>
      </Grid>
    </Grid>
  )
}

export default PlatformLoans
