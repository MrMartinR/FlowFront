import React, { useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'
import * as platformsActions from '../state/platformsActions'
import { RootState } from '../../../../redux/rootReducer'
import { useHistory } from 'react-router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Loan Id', width: 250 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'borrower', headerName: 'Borrower', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 150 },
  { field: 'date_issued', headerName: 'Issued', width: 150 },
  { field: 'date_listed', headerName: 'Listed', width: 150 },
  { field: 'date_maturity', headerName: 'Maturity', width: 150 },
  { field: 'amortization', headerName: 'Amortization', width: 150 },
  { field: 'installment', headerName: 'Installment', width: 150 },
  { field: 'code', headerName: 'Code', width: 150 },
  { field: 'xirr', headerName: 'Xirr', width: 150 },
  { field: 'air', headerName: 'Air', width: 100 },
] as any

export const PlatformLoans = (props: any) => {
  const { id } = props
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )

  const GetPlatformLoans = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchPlatformLoans(id));
      } 
    }, [dispatch]);
  }
  GetPlatformLoans();

  useEffect(() => {
    currentState.platformLoans &&
    setList(currentState.platformLoans)
  }, [currentState.platformLoans])
  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)
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
                  rows={list} 
                  columns={columns}
                  onRowClick={handleClick}
                  disableMultipleSelection={true} 
                  loading={isLoading} />
              </div>
            </Grid>
          </Grid>
        )
      }
    </>
  )
}