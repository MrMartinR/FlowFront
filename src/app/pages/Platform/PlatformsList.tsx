import { useHistory } from 'react-router-dom'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { makeStyles, Grid, LinearProgress, CardMedia, Tooltip, IconButton } from '@material-ui/core/'
import IconProtectionBuyBack from '../../../common/layout/components/icons/ProtectionBuyBack'
import IconProtectionPersonal from '../../../common/layout/components/icons/ProtectionPersonal'
import IconProtectionCollateral from '../../../common/layout/components/icons/ProtectionCollateral'
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
    field: 'status',
    headerName: 'Status',
    description: 'Status',
    width: 125,
    renderCell: (params: GridCellParams) => (
      <Tooltip title={`${params.value}`}>
        <IconButton style={{ width: '50px' }}>
          <CardMedia
            component="img"
            src={'/media/svg/platform-status/' + `${params.value}`.toLowerCase() + '.svg'}
            alt={`${params.value}`}
            
          />
        </IconButton>
      </Tooltip>
    ),
  },
  {
    field: 'trade_name',
    headerName: 'Platform',
    width: 180,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia
          component="img"
          src={'/media/svg/contact/logos/' + params.row.contact_id + '.svg'}
          title={`${params.value}`}
          alt={`${params.value}`}
        />
      </>
    ),
  },
  { field: 'category', headerName: 'Category', width: 150, resizable: false },
  { field: 'account_category', headerName: 'Investors', width: 150 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 180 },
  { field: 'min_investment', headerName: 'Min Investment', width: 190 },
  {
    field: 'protection_scheme',
    headerName: 'Protection Scheme',
    width: 220,
    renderCell: (params: GridCellParams) =>
      params.value && (
        <>
          {params.value.toString().includes('Collateral') && (
            <Tooltip title="Colaterall">
              <IconButton>
                <IconProtectionCollateral />
              </IconButton>
            </Tooltip>
          )}
          {params.value.toString().includes('BuyBack Guarantee') && (
            <Tooltip title="BuyBack Guarantee">
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
      ),
  },
  { field: 'secondary_market', type: 'boolean', headerName: 'SM', description: 'Secondary Market', width: 100 },
  { field: 'structure', headerName: 'Structure', width: 150 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'liquidity', headerName: 'Liquidity', width: 150 },
  { field: 'promo', headerName: 'Promo', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 190 },
]

export const PlatformsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  // se premes nunha fila redirixe a paxina dos details de ese platform
  const handleClick = (e: any) => linkTo.push(`/platforms/${e.row.id}`)

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
