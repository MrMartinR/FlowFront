import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Grid, LinearProgress } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'
import * as platformsActions from '../state/platformsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useHistory } from 'react-router'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Originator Id', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

export const PlatformOriginators = (props: any) => {
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
        dispatch(platformsActions.fetchPlatformOriginators(id));
      } 
    }, [dispatch]);
  }
  GetPlatformOriginators();

  useEffect(() => {
    currentState.platformOriginators &&
    setList(currentState.platformOriginators)
  }, [currentState.platformOriginators])

  const rows = [] as any;
  if (list.length >0) list.map((item: any) => {
    const newRow = {
      id : item.attributes?.originator?.id,
      customer_category: item.attributes?.originator?.customer_category,
      product_category_business: item.attributes?.originator?.product_category_business,
      product_category_consumer: item.attributes?.originator?.product_category_consumer,
      apr: item.attributes?.originator?.apr,
    }
    rows.push(newRow);
    return rows;
  })  
  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`)
  return (
    <>
      {
        isLoading ? 
        (
          <Grid container direction="column">
            <LinearProgress color="secondary" />
          </Grid>
        ) : (
          <Grid xs={12}>
            <Grid container direction="column">
              <div style={{ height: 600, width: '100%' }}>
                <XGrid 
                  rows={rows} 
                  columns={columns} 
                  disableMultipleSelection={true} 
                  onRowClick={handleClick}
                  loading={isLoading} />
              </div>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}