import { useHistory } from 'react-router-dom'
import { Grid, LinearProgress, makeStyles, CardMedia } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef, GridCellParams } from '@material-ui/x-grid'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
  },

  table: {
    background: '#ffffff',
    height: 600,
    width: '100%',
  },
})
const columns: GridColDef[] = [
  // column definition format here
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'air', headerName: 'Air', width: 180 },
  {
    field: 'country',
    headerName: 'Flag',
    width: 100,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/flags/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },
  { field: 'country_name', headerName: 'Country', width: 180 },
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
  {
    field: 'originator',
    headerName: 'Originator',
    width: 130,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia
          component="img"
          src={'/media/svg/contact/logos/' + params.value + '.svg'}
          title={`${params.value}`}
          alt={`${params.value}`}
        />
      </>
    ),
  },
  {
    field: 'platform',
    headerName: 'Platform',
    width: 120,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/contact/logos/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
      />
    ),
  },
  { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'security_details', headerName: 'Security details', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
] as any

export const LoansList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  // se premes nunha fila carga o loan correspondente
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)
  return (
    <Grid container direction="column" className={classes.root}>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid className={classes.table}>
          <XGrid
            loading={isLoading}
            rows={rows}
            columns={columns}
            hideFooterSelectedRowCount={true}
            disableMultipleSelection={true}
            disableColumnReorder={true}
            // disableColumnResize={true}
            onRowClick={handleClick}
          />
        </Grid>
      )}
    </Grid>
  )
}
