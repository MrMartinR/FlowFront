import { useHistory } from 'react-router-dom'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { makeStyles, Grid, LinearProgress, CardMedia } from '@material-ui/core/'
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
    width: 100,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia
          component="img"
          src={'/media/svg/platform-status/' + `${params.value}`.toLowerCase() + '.svg'}
          alt={`${params.value}`}
          style={{ padding: '30px' }}
        />
      </>
    ),
  },
  {
    field: 'trade_name',
    headerName: 'Platform',
    width: 120,
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
  { field: 'category', headerName: 'Category', width: 130, resizable: false },
  { field: 'account_category', headerName: 'Investors', width: 130 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 130 },
  { field: 'min_investment', headerName: 'Min Investment', width: 130 },
  /* @TODO: Fix this crap code, en vez de or, facer que mostren todos os iconos relevantes o contido..
   *  o texto do array xuntao con unha comma... */
  /* @TODO: Meterlle tooltips nos iconos. */
  {
    field: 'protection_scheme',
    headerName: 'Protection Scheme',
    width: 130,
    renderCell: (params: GridCellParams) =>
      (params.value === 'Collateral' && <IconProtectionCollateral />) ||
      (params.value === 'BuyBack Guarantee' && <IconProtectionBuyBack />) ||
      (params.value === 'Personal Guarantee' && <IconProtectionPersonal />) ||
      (params.value === 'Provision Fund' && <IconProtectionFund />),
  },
  { field: 'secondary_market', type: 'boolean', headerName: 'SM', description: 'Secondary Market', width: 80 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'liquidity', headerName: 'Liquidity', width: 130 },
  { field: 'promo', headerName: 'Promo', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 130 },
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
