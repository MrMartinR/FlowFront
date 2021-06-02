import { useEffect, useState } from 'react'
import { Grid, Card, CardContent, LinearProgress } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserOriginatorsListToolbar } from './UserOriginatorListToolbar'
import { UserAlert } from '../../utils/UserAlert'
import * as userOriginatorsActions from './state/userOriginatorsActions'
import { useHistory } from 'react-router'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  // column definition format here
  { field: 'trade_name', headerName: 'Name', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

export const UserOriginatorsList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userOriginators,
    }),
    shallowEqual
  )
  const dispatch = useDispatch()
  const resetSuccess = () => {
    dispatch(userOriginatorsActions.resetSuccess())
  }

  useEffect(() => {
    dispatch(userOriginatorsActions.fetchUserOriginatorsData());
  }, [dispatch])

  useEffect(() => { if (
    currentState.userOriginatorsData
    ) {
      setList(currentState.userOriginatorsData);
    }
  }, [currentState.userOriginatorsData]);

  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const linkTo = useHistory();
  const handleClick = (e: any) => linkTo.push(`/originators/${e.row.id}`);

  const rows = [] as any;
  if (list.length >1) list.map((originator: any) => {
    const newRow = {
      id : originator.id,
      trade_name: originator.attributes.contact?.trade_name,
      customer_category: originator.attributes.customer_category,
      product_category_business: originator.attributes.product_category_business,
      product_category_consumer: originator.attributes.product_category_consumer,
      apr: originator.attributes.apr,
    }
    rows.push(newRow);
    return rows;
  })

  return (
    <>
      {isLoading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <UserOriginatorsListToolbar list = { rows }/>
          <UserAlert error= { currentState.error } success = { currentState.success } resetSuccess={ resetSuccess }/>
          <Grid container direction="column">
            <Card>
              <CardContent>
                <div style={{ height: 600, width: '100%' }}>
                  <XGrid 
                    rows={rows} 
                    columns={columns}
                    onRowClick={handleClick} 
                    disableMultipleSelection={true} 
                    loading={isLoading} 
                    />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </>
  )
}