import { makeStyles, Grid, LinearProgress } from '@material-ui/core/'
import { useHistory } from 'react-router-dom'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'

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

/* define the columns for the table */
const columns: GridColDef[] = [
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'trade_name', headerName: 'Platform', width: 200 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'account_category', headerName: 'Investors', width: 130 },
  // { field: 'cost', headerName: 'Cost', width: 130 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 130 },
  { field: 'min_investment', headerName: 'Min Investment', width: 130 },
  { field: 'protection_scheme', headerName: 'Protection Scheme', width: 130 },
  { field: 'secondary_market', headerName: 'SM', width: 80 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'liquidity', headerName: 'Liquidity', width: 130 },
  { field: 'promo', headerName: 'Promo', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 130 },
  // { field: 'taxes', headerName: 'Taxes', width: 130 },
]

export const PlatformsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/platforms/${e.row.id}`)
  
  return (
    <Grid container direction="column" className={classes.root}>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
          <Grid className={classes.table}>
            <XGrid
              loading={isLoading}
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount={true}
              disableMultipleSelection={true}
              onRowClick={handleClick}
            />
          </Grid>
      )}
    </Grid>
  )
}
