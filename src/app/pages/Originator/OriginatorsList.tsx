import { Grid, CardMedia, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'

import { useHistory } from 'react-router'
import IconBusiness from '../../../common/layout/components/icons/Business'
import IconConsumer from '../../../common/layout/components/icons/Consumer'

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
      <CardMedia
        component="img"
        src={'/media/svg/contact/logos/' + params.row.contact_id + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
      />
    ),
  },
  /* @TODO: Fix this crap combination */
  {
    field: 'customer_category',
    headerName: 'Customer',
    width: 80,
    renderCell: (params: GridCellParams) =>
      (params.value == 'Business' && <IconBusiness />) ||
      (params.value == 'Consumer' && <IconConsumer />) ||
      (params.value == 'Business,Consumer' && (
        <>
          <IconConsumer /> <IconBusiness />
        </>
      )) ||
      (params.value == 'Consumer,Business' && (
        <>
          <IconConsumer /> <IconBusiness />
        </>
      )),
  },
  // { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

export const OriginatorsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  // se premes nunha fila carga a paxina de details do originator correpondente
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`)
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
