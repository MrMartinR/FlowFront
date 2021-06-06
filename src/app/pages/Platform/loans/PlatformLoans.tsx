import { useEffect, useState } from 'react'
import { RootState } from '../../../../redux/rootReducer'
import { useHistory } from 'react-router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { XGrid, GridColDef, GridCellParams } from '@material-ui/x-grid'
import { Grid, makeStyles, Avatar, LinearProgress } from '@material-ui/core/'
import * as platformsActions from '../state/platformsActions'

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
  { field: 'status', headerName: 'Status', width: 100 },
  {
    field: 'country',
    headerName: 'Country',
    width: 100,
    renderCell: (params: GridCellParams) => (
      <Avatar
        src={'/media/svg/flags/' + params.value + '.svg'}
        variant="rounded"
        style={{ height: '24px', width: '28px' }}
      />
    ),
  },
  { field: 'country_name', headerName: 'Country Name', width: 180 },
  { field: 'id', headerName: 'Loan Id', width: 250 },
  { field: 'code', headerName: 'Code', width: 150 },
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'borrower_type', headerName: 'Borrower type', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'borrower', headerName: 'Borrower', width: 250 },
  { field: 'amount', headerName: 'Amount', width: 100 },
  { field: 'gender', headerName: 'Gender', width: 80 },
  { field: 'date_issued', headerName: 'Issued', width: 100 },
  { field: 'date_listed', headerName: 'Listed', width: 100 },
  { field: 'date_maturity', headerName: 'Maturity', width: 100 },
  { field: 'amortization', headerName: 'Amortization', width: 150 },
  { field: 'installment', headerName: 'Installment', width: 150 },
  { field: 'xirr', headerName: 'XIRR', width: 100 },
  { field: 'air', headerName: 'AIR', width: 100 },
] as any

export const PlatformLoans = (props: any) => {
  /* styles */
  const classes = useStyles()

  const { id } = props
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  // peticion da lista de platformloans
  useEffect(() => {
    dispatch(platformsActions.fetchPlatformLoans(id))
  }, [dispatch, id])
  // recibida resposta carganse os datos do state
  useEffect(() => {
    currentState.platformLoans && setList(currentState.platformLoans)
  }, [currentState.platformLoans])
  // con eses datos enchense as filas da tabla
  const rows = [] as any
  if (list.length > 0)
    list.map((item: any) => {
      const newRow = {
        country: item.attributes.country_iso_code,
        country_name: item.attributes.country_name,
        id: item.id,
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
      rows.push(newRow)
      return rows
    })
  // actualizase os falgs de loadings cos datos do state
  useEffect(() => {
    setIsLoading(currentState.loading)
  }, [currentState.loading])
  const linkTo = useHistory()
  // se preme nunha fila carga a paxina correspondente a ese loan
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)
  return (
    <Grid container direction="column" className={classes.root}>
      {isLoading ? (
        <LinearProgress color="secondary" />
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
