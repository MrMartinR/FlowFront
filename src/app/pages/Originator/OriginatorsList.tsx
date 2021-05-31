import { Grid, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'

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
const columns: GridColDef[] = [
  // column definition format here
  { field: 'trade_name', headerName: 'Name', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

export const OriginatorsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory();
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`);
  return (
    <Grid container direction="column" className={classes.root}>
      {isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid className={classes.table}>
          <XGrid 
            rows={rows} 
            columns={columns}
            onRowClick={handleClick}
            hideFooterSelectedRowCount={true}
            disableMultipleSelection={true} 
            loading={isLoading} 
            />
        </Grid>
      )}
    </Grid>
  )
}