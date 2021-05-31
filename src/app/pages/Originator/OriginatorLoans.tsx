import { useEffect, useState } from 'react'
import { Avatar, Container, Grid, LinearProgress, makeStyles } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef, GridCellParams } from '@material-ui/x-grid'
import * as platformsActions from './state/originatorsActions'
import { RootState } from '../../../redux/rootReducer'
import { useHistory } from 'react-router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)
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
const columns: GridColDef[] = [
  // column definition format here
  { field: 'country', headerName: 'Flag', width: 100, renderCell: (params: GridCellParams) => (
    <strong>
      <Avatar variant="square"><img src={'/media/svg/flags/'+params.value+'.svg'} alt="" /></Avatar>
    </strong>
  ),},
  { field: 'country_name', headerName: 'Country Name', width: 180 },
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

export const OriginatorLoans = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { id } = props
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.originators,
    }),
    shallowEqual
  )

  const GetOriginatorLoans = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchOriginatorLoans(id));
      } 
    }, [dispatch]);
  }
  GetOriginatorLoans();

  useEffect(() => {
    currentState.originatorLoans &&
    setList(currentState.originatorLoans)
  }, [currentState.originatorLoans])
  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const rows = [] as any;
  if (list.length >0) list.map((item: any) => {
    const newRow = {
      country: item.attributes.country_iso_code,
      country_name: item.attributes.country_name,
      id : item.id,
      name: item.attributes?.name,
      borrower: item.attributes?.borrower,
      status: item.attributes?.status,
      amount: item.attributes?.amount,
      category: item.attributes?.category,
      borrower_type: item.attributes?.borrower_type,
      gender: item.attributes?.gender,
      date_issued: item.attributes?.date_issued,
      date_listed: item.attributes?.date_listed,
      date_maturity: item.attributes?.date_maturity,
      amortization: item.attributes?.amortization,
      installment: item.attributes?.installment,
      code: item.attributes?.code,
      xirr: item.attributes?.xirr,
      air: item.attributes?.air,
    }
    rows.push(newRow);
    return rows;
  })  

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)
  return (
    <Container>
      <Grid xs={12} container>

      </Grid>
      { isLoading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container direction="column">
            <XGrid
              className={classes.table}
              rows={rows} 
              columns={columns}
              onRowClick={handleClick}
              disableMultipleSelection={true} 
              loading={isLoading} />
        </Grid>
      )}
    </Container>
  )
}