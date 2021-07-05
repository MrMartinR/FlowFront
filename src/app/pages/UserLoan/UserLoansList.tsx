import { useHistory } from 'react-router-dom'
import { Grid, LinearProgress, makeStyles, Tooltip, IconButton } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'
import IconConsumer from '../../../common/layout/components/icons/Consumer'
import IconBusiness from '../../../common/layout/components/icons/Business'
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
const columns: GridColDef[] = [
  // column definition format here

  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'air', headerName: 'AIR', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
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
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'code', headerName: 'Code', width: 180 },
  { field: 'date_issued', headerName: 'Issued', width: 180 },
  { field: 'date_listed', headerName: 'Listed', width: 180 },
  { field: 'date_maturity', headerName: 'Maturity', width: 180 },
  { field: 'dti_rating', headerName: 'DTI rating', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'installment', headerName: 'Installment', width: 180 },
  { field: 'internal_code', headerName: 'Internal Code', width: 180 },
  { field: 'notes', headerName: 'Notes', width: 180 },
  { field: 'position', headerName: 'Position', width: 180 },
  { field: 'investment_amount', headerName: 'Investment Amount', width: 180 },
  { field: 'date_in', headerName: 'Date In', width: 180 },
  { field: 'date_out', headerName: 'Date Out', width: 180 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 180 },
  {
    field: 'protection_scheme',
    headerName: 'Protection Scheme',
    width: 220,
    renderCell: (params: GridCellParams) =>
      params.value && (
        <>
          <>
            {params.value.toString().includes('Collateral') && (
              <Tooltip title="Collateral">
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
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'XIRR', width: 180 },
  { field: 'market', headerName: 'Market', width: 180 },
] as any

export const UserLoansList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  // se premes nunha fila carga a paxina dos details de ese loan
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.loan_id}`)

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
