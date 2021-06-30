import { useHistory } from 'react-router-dom'
import { Grid, LinearProgress, makeStyles, CardMedia, Tooltip, IconButton } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'
import IconConsumer from '../../../common/layout/components/icons/Consumer'
import IconBusiness from '../../../common/layout/components/icons/Business'
import IconPlatform from '../../../common/layout/components/icons/Platform'
import IconOriginator from '../../../common/layout/components/icons/Originator'
import IconProtectionCollateral from '../../../common/layout/components/icons/ProtectionCollateral'
import IconProtectionBuyBack from '../../../common/layout/components/icons/ProtectionBuyBack'
import IconProtectionPersonal from '../../../common/layout/components/icons/ProtectionPersonal'
import IconProtectionFund from '../../../common/layout/components/icons/ProtectionFund'

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

/* define the columns for the table */
const columns: GridColDef[] = [
  {
    field: 'platform',
    headerName: <IconPlatform />,
    description: 'Platform',
    width: 80,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/contact/icons/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },
  {
    field: 'originator',
    headerName: <IconOriginator />,
    width: 80,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/contact/icons/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },

  {
    field: 'country',
    headerName: 'Country',
    description: 'Country',
    width: 120,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/flags/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '36px' }}
      />
    ),
  },
  { field: 'code', headerName: 'Code', width: 120 },
  { field: 'name', headerName: 'Name', width: 180 },

  { field: 'currency', headerName: 'Currency', width: 120, sortable: false },
  {
    field: 'borrower_type',
    headerName: 'Borrower Type',
    description: 'Borrower Type: Consumer | Business',
    width: 160,
    sortable: false,
    renderCell: (params: GridCellParams) =>
      (params.value === 'Consumer' && (
        <Tooltip title="Consumer">
          <IconButton>
            <IconConsumer />
          </IconButton>
        </Tooltip>
      )) ||
      (params.value === 'Business' && (
        <Tooltip title="Business">
          <IconButton>
            <IconBusiness />
          </IconButton>
        </Tooltip>
      )),
  },
  { field: 'category', headerName: 'Category', width: 180, sortable: false },
  { field: 'date_issued', headerName: 'Issued', width: 130, resizable: false },
  { field: 'date_listed', headerName: 'Listed', width: 130, resizable: false },
  { field: 'date_maturity', headerName: 'Maturity', width: 140, resizable: false },
  { field: 'amortization', headerName: 'Amortization', width: 180, sortable: false },
  { field: 'internal_code', headerName: 'Internal code', width: 180, hide: true },
  {
    field: 'protection_scheme',
    headerName: 'Protection Scheme',
    width: 220,
    renderCell: (params: GridCellParams) =>
      params.value && (
        <>
          <>
            {params.value.toString().includes('Collateral') && (
              <Tooltip title="Colaterall">
                <IconButton>
                  <IconProtectionCollateral />
                </IconButton>
              </Tooltip>
            )}
            {params.value.toString().includes('BuyBack') && (
              <Tooltip title="BuyBack">
                <IconButton>
                  <IconProtectionBuyBack />
                </IconButton>
              </Tooltip>
            )}
            {params.value.toString().includes('Personal Guarantee') && (
              <Tooltip title="Personal Guarantee">
                <IconButton>
                  <IconProtectionPersonal />
                </IconButton>
              </Tooltip>
            )}
            {params.value.toString().includes('Provision Fund') && (
              <Tooltip title="Provision Fund">
                <IconButton>
                  <IconProtectionFund />
                </IconButton>
              </Tooltip>
            )}
          </>
        </>
      ),
  },
  { field: 'rating', headerName: 'Rating', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },

  /* AIR */
  {
    field: 'air',
    headerName: 'AIR',
    width: 100,
  },

  /* XIRR */
  {
    field: 'xirr',
    headerName: 'XIRR',
    width: 110,
  },
] as any

export const LoansList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  /* clicking in a row will load the loan details */
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
            // components={{
            //   Toolbar: GridToolbar,
            // }}
          />
        </Grid>
      )}
    </Grid>
  )
}
