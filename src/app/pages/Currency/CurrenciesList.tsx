import { Grid, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, GridColDef, LicenseInfo } from '@material-ui/x-grid'

import { useHistory } from 'react-router'
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
  { field: 'kind', headerName: 'Type', width: 120 },
  { field: 'code', headerName: 'Code', width: 100 },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'symbol', headerName: 'Symbol', width: 120 },
  { field: 'decimal_places', headerName: 'Decimals', width: 120 },
  { field: 'fx_eur', headerName: 'FX EUR', width: 120 },
]

export const CurrenciesList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props

  const linkTo = useHistory()
  // función para cando premes nunha fila ir os details de ese currency
  const handleClick = (e: any) => linkTo.push(`/currencies/${e.row.id}`)

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
