import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as platformsActions from '../state/platformsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useHistory } from 'react-router'
import { makeStyles, Grid, LinearProgress, CardMedia } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'

//* styles */
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
    field: 'id',
    headerName: 'Originator',
    width: 250,
    resizable: false,
    renderCell: (params: GridCellParams) => (
      <>
        <CardMedia
          component="img"
          src={'/media/svg/contact/logos/' + params.value + '.svg'}
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

export const PlatformOriginators = (props: any) => {
  /* styles */
  const classes = useStyles()
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  const { id } = props
  const dispatch = useDispatch()
  // peticion dos platform originators
  useEffect(() => {
    dispatch(platformsActions.fetchPlatformOriginators(id))
  }, [dispatch, id])
  // recibida resposta carga os datos do state
  useEffect(() => {
    currentState.platformOriginators && setList(currentState.platformOriginators)
  }, [currentState.platformOriginators])
  // con eses datos preparanse as filas da tabla
  const rows = [] as any
  if (list.length > 0)
    list.map((item: any) => {
      const newRow = {
        id: item.attributes?.originator?.contact_id,
        customer_category: item.attributes?.originator?.customer_category,
        product_category_business: item.attributes?.originator?.product_category_business,
        product_category_consumer: item.attributes?.originator?.product_category_consumer,
        apr: item.attributes?.originator?.apr,
      }
      rows.push(newRow)
      return rows
    })
  // cos datos do state actualizanse os flags de loading
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])

  const linkTo = useHistory()
  // seleccionada unha fila carga a paxina dos details do originator
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
