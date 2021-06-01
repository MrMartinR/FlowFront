import { Grid, CardMedia, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'

import { useHistory } from 'react-router'

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
  {
    field: 'trade_name',
    headerName: 'Originator',
    width: 130,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia
          component="img"
          src={'/media/svg/contact/logos/' + params.getValue('contact_id') + '.svg'}
          title={`${params.value}`}
          alt={`${params.value}`}
        />
      </>
    ),
  },

  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

export const OriginatorsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`)
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
