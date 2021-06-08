import { XGrid, LicenseInfo, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { CardMedia, Grid, LinearProgress, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import * as userPlatformsActions from './../state/userPlatformsActions'
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
  {
    field: 'contact_id',
    headerName: 'User Platform',
    description: 'User platform',
    width: 200,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia component="img" src={'/media/svg/contact/logos/' + params.value + '.svg'} alt={`${params.value}`} />
      </>
    ),
  },
]

export const UserPlatformsList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isLoading, rows } = props

  // cando elixes unha platform da lista carga os detalles
  const handleClick = (e: any) => {
    dispatch(userPlatformsActions.fetchUserPlatformDetails(e.row.id))
  }

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
