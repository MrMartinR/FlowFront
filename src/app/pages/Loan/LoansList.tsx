import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, Card, CardContent, LinearProgress, Avatar } from '@material-ui/core/'
import { XGrid, LicenseInfo, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { RootState } from '../../../redux/rootReducer'
import { LoansAlert } from './LoansAlert'
import { LoansListToolbar } from './LoansListToolbar'
import * as loansActions from './state/loansActions'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  // column definition format here
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
  { field: 'originator', headerName: 'Originator', width: 180 },
  { field: 'platform', headerName: 'Platform', width: 180 },
  { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  { field: 'rating', headerName: 'Rating', width: 180 },
  { field: 'security_details', headerName: 'Security details', width: 180 },
  { field: 'status', headerName: 'Status', width: 180 },
  { field: 'xirr', headerName: 'Xirr', width: 180 },
] as any

export const LoansList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.loans,
    }),
    shallowEqual
  )
  const GetAllLoans = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(loansActions.fetchLoansData());
      } 
    }, [dispatch])
  }
  GetAllLoans();
  useEffect(() => { if (
    currentState.loansData
    ) {
      setList(currentState.loansData);
    }
  }, [currentState.loansData]);

  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)

  const rows = [] as any;
  if (list.length >1) list.map((loan: any) => {
    const newRow = {
      id : loan.id,
      name: loan.attributes.name,
      air: loan.attributes.air,
      country: loan.attributes.country.iso_code,
      country_name: loan.attributes.country.name,
      currency: loan.attributes.currency.name,
      amortization: loan.attributes.amortization,
      amount: loan.attributes.amount,
      borrower: loan.attributes.borrower,
      borrower_type: loan.attributes.borrower_type,
      category: loan.attributes.category,
      code: loan.attributes.code,
      date_issued: loan.attributes.date_issued,
      date_listed: loan.attributes.date_listed,
      date_maturity: loan.attributes.date_maturity,
      description: loan.attributes.description,
      dti_rating: loan.attributes.dti_rating,
      gender: loan.attributes.gender,
      installment: loan.attributes.installment,
      internal_code: loan.attributes.internal_code,
      notes: loan.attributes.notes,
      originator: loan.attributes.originator.id,
      platform: loan.attributes.platform.id,
      protection_scheme: loan.attributes.protection_scheme,
      rating: loan.attributes.rating,
      security_details: loan.attributes.security_details,
      status: loan.attributes.status,
      xirr: loan.attributes.xirr,
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
          <LoansListToolbar list = { rows }/>
          <LoansAlert />
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