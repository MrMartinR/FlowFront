import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import { connect } from 'react-redux'
import { fetchPlatformLoans } from '../state/platformsActions'

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

const PlatformLoans = (props: any) => {
  const { fetchPlatformLoans } = props
  const { platformLoans, loading } = props.platforms

  useEffect(() => {
    fetchPlatformLoans(props.id)
  }, [fetchPlatformLoans])

  if (loading) {
    return (
      <>
        <Typography variant="h5">Loading platform loans...</Typography>
      </>
    )
  }

  return (
    <Grid xs={12}>
      <Grid container direction="column">
        <div style={{ height: 600, width: '100%' }}>
          <XGrid rows={platformLoans} columns={columns} disableMultipleSelection={true} loading={true} />
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformLoans: (platformId: any) => dispatch(fetchPlatformLoans(platformId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformLoans)
