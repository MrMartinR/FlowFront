import { CardMedia, Grid, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, GridColDef, LicenseInfo, GridCellParams } from '@material-ui/x-grid'

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
  { field: 'continent', headerName: 'Continent', width: 200 },
  {
    field: 'flag',
    headerName: 'Flag',
    width: 100,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        style={{ padding: '18px' }}
        component="img"
        src={'/media/svg/flags/' + params.value + '.svg'}
<<<<<<< Updated upstream
        alt={`${params.getValue('name')}`}
        title={`${params.getValue('name')}`}
=======
        alt={`${params.row.name}`}
        title={`${params.row.name}`}
>>>>>>> Stashed changes
      />
    ),
  },
  { field: 'iso_code', headerName: 'ISO', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'currency', headerName: 'Currency', width: 120 },
  { field: 'fiscal_year_start', headerName: 'Fiscal Year', width: 140 },
]

export const CountriesList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  // función para cando premes nunha fila ir os details de ese Country
  const handleClick = (e: any) => linkTo.push(`/countries/${e.row.id}`)

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
