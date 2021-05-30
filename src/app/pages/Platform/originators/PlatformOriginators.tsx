import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as platformsActions from '../state/platformsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useHistory } from 'react-router'
import { makeStyles, Container, Grid, LinearProgress } from '@material-ui/core/'
import { XGrid, GridColDef } from '@material-ui/x-grid'

/* styles */
const useStyles = makeStyles({
  table: {
    background: '#ffffff',
    height: 700,
    minWidth: 400,
    overflow: 'auto',
    position: 'relative',
  },
})

/* define the columns for the table */
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Originator', width: 250 },
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

  const GetPlatformOriginators = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchPlatformOriginators(id))
      }
    }, [dispatch])
  }
  GetPlatformOriginators()

  useEffect(() => {
    currentState.platformOriginators && setList(currentState.platformOriginators)
  }, [currentState.platformOriginators])

  const rows = [] as any
  if (list.length > 0)
    list.map((item: any) => {
      const newRow = {
        id: item.attributes?.originator?.id,
        customer_category: item.attributes?.originator?.customer_category,
        product_category_business: item.attributes?.originator?.product_category_business,
        product_category_consumer: item.attributes?.originator?.product_category_consumer,
        apr: item.attributes?.originator?.apr,
      }
      rows.push(newRow)
      return rows
    })
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`)
  return (
    <>
      <Container>
        <Grid xs={12} container>
          {isLoading ? (
            <LinearProgress color="secondary" />
          ) : (
            <XGrid
              className={classes.table}
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount={true}
              disableMultipleSelection={true}
              onRowClick={handleClick}
              loading={isLoading}
            />
          )}
        </Grid>
      </Container>
    </>
  )
}
