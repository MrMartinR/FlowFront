import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Card, CardContent, LinearProgress, Avatar} from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { RootState } from '../../../redux/rootReducer'
import { UserLoansAlert } from './UserLoansAlert'
import { UserLoansListToolbar } from './UserLoansListToolbar'
import * as userLoansActions from './state/userLoansActions'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Id', width: 180 },
  { field: 'name', headerName: 'Name', width: 180 },
  { field: 'air', headerName: 'Air', width: 180 },
  { field: 'country', headerName: 'Flag', width: 100, renderCell: (params: GridCellParams) => (
    <strong>
      <Avatar variant="square"><img src={'/media/svg/flags/'+params.value+'.svg'} alt="" /></Avatar>
    </strong>
  ),},
  { field: 'country_name', headerName: 'Country', width: 180 },
  { field: 'currency', headerName: 'Currency', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180 },
  { field: 'amount', headerName: 'Amount', width: 180 },
  { field: 'borrower', headerName: 'Borrower', width: 180 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 180 },
  { field: 'category', headerName: 'Category', width: 180 },
  { field: 'code', headerName: 'Code', width: 180 },
  { field: 'date_issued', headerName: 'Date issued', width: 180 },
  { field: 'date_listed', headerName: 'Date listed', width: 180 },
  { field: 'date_maturity', headerName: 'Maturity date', width: 180 },
  { field: 'description', headerName: 'Description', width: 180 },
  { field: 'dti_rating', headerName: 'Dti rating', width: 180 },
  { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'installment', headerName: 'Installment', width: 180 },
  { field: 'internal_code', headerName: 'Internal code', width: 180 },
  { field: 'notes', headerName: 'Notes', width: 180 },
  { field: 'position', headerName: 'Position', width: 180 },
  { field: 'investment_amount', headerName: 'Investment amount', width: 180 },
  { field: 'date_in', headerName: 'Date in', width: 180 },
  { field: 'date_out', headerName: 'Date out', width: 180 },
  { field: 'loan_id', headerName: 'Loan Id', width: 180 },
  { field: 'invest_mode', headerName: 'Invest mode', width: 180 },
  { field: 'originator', headerName: 'Originator', width: 180 },
  { field: 'platform', headerName: 'Platform', width: 180 },
  { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'security_details', headerName: 'Security details', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
  { field: 'market', headerName: 'Market', width: 180 },
] as any

export const UserLoansList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.userLoans,
    }),
    shallowEqual
  )
  const GetAllUserLoans = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(userLoansActions.fetchUserLoansData());
      } 
    }, [dispatch])
  }
  GetAllUserLoans();
  useEffect(() => { if (
    currentState.userLoansData
    ) {
      setList(currentState.userLoansData);
    }
  }, [currentState.userLoansData]);

  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.loan_id}`)
  const rows = [] as any;
  if (list.length >1) list.map((loan: any) => {
    const newRow = {
      id : loan.id||'123',
      name: loan.attributes.loan?.name||'',
      air: loan.attributes.loan?.air||'',
      country: loan.attributes.loan?.country||'',
      country_name: loan.attributes.loan?.country_id||'',
      currency: loan.attributes.loan?.currency_id||'',
      amortization: loan.attributes.loan?.amortization||'',
      amount: loan.attributes.loan?.amount||'',
      borrower: loan.attributes.loan?.borrower||'',
      borrower_type: loan.attributes.loan?.borrower_type||'',
      category: loan.attributes.loan?.category||'',
      code: loan.attributes.loan?.code||'',
      date_issued: loan.attributes.loan?.date_issued||'',
      date_listed: loan.attributes.loan?.date_listed||'',
      date_maturity: loan.attributes.loan?.date_maturity||'',
      description: loan.attributes.loan?.description||'',
      dti_rating: loan.attributes.loan?.dti_rating||'',
      gender: loan.attributes.loan?.gender||'',
      installment: loan.attributes.loan?.installment||'',
      internal_code: loan.attributes.loan?.internal_code||'',
      notes: loan.attributes.loan?.notes||'',
      position: loan.attributes.position||'',
      investment_amount: loan.attributes.investment_amount,
      date_in: loan.attributes.date_in,
      date_out: loan.attributes.date_out,
      loan_id: loan.attributes.loan?.id||'',
      invest_mode: loan.attributes.invest_mode,
      originator: loan.attributes.loan?.platform_originator_id||'',
      platform: loan.attributes.loan?.platform_originator_id||'',
      protection_scheme: loan.attributes.loan?.protection_scheme||'',
      rating: loan.attributes.loan?.rating||'',
      security_details: loan.attributes.loan?.security_details||'',
      status: loan.attributes.loan?.status||'',
      xirr: loan.attributes.xirr,
      market: loan.attributes.market,
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
          <UserLoansListToolbar list = { rows }/>
          <UserLoansAlert />
          <Grid container direction="column">
            <Card>
              <CardContent>
                <div style={{ height: 600, width: '100%' }}>
                  <XGrid
                    rows={rows}
                    columns={columns}
                    disableMultipleSelection={true}
                    onRowClick={handleClick}
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