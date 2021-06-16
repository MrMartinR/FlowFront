import { useHistory } from 'react-router-dom'
import { Grid, LinearProgress, makeStyles, CardMedia } from '@material-ui/core/'
import { XGrid, GridColDef, GridCellParams,  GridValueFormatterParams } from '@material-ui/x-grid'
import IconConsumer from '../../../common/layout/components/icons/Consumer'
import IconBusiness from '../../../common/layout/components/icons/Business'
import IconPlatform from '../../../common/layout/components/icons/Platform'
import IconOriginator from '../../../common/layout/components/icons/Originator'
import IconProtectionCollateral from '../../../common/layout/components/icons/ProtectionCollateral'
import IconProtectionBuyBack from '../../../common/layout/components/icons/ProtectionBuyBack'
import IconProtectionPersonal from '../../../common/layout/components/icons/ProtectionPersonal'
import IconProtectionFund from '../../../common/layout/components/icons/ProtectionFund'

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

/* define the columns for the table */
const columns: GridColDef[] = [
  {
    field: 'platform',
    // headerName: 'Platform',
    headerName: <IconPlatform />,
    description: 'Platform',
    width: 80,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/contact/icons/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },
  {
    field: 'originator',
    // headerName: 'Originator',
    headerName: <IconOriginator />,
    width: 80,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/contact/icons/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },

  {
    field: 'country',
    headerName: 'Country',
    description: 'Country',
    width: 80,
    resizable: false,
    sortable: false,
    renderCell: (params: GridCellParams) => (
      <CardMedia
        component="img"
        src={'/media/svg/flags/' + params.value + '.svg'}
        title={`${params.value}`}
        alt={`${params.value}`}
        style={{ padding: '18px' }}
      />
    ),
  },
  { field: 'code', headerName: 'Code', width: 120 },
  { field: 'name', headerName: 'Name', width: 180 },

  // { field: 'country_name', headerName: 'Country', width: 180,  },
  // @TODO: change the currency for ISO Currency
  { field: 'currency', headerName: 'Currency', width: 100, sortable: false },
  {
    field: 'borrower_type',
    headerName: 'Borrower Type',
    description: 'Borrower Type: Consumer | Business',
    width: 80,
    sortable: false,
    renderCell: (params: GridCellParams) =>
      (params.value === 'Consumer' && <IconConsumer />) || (params.value === 'Business' && <IconBusiness />),
  },
  { field: 'category', headerName: 'Category', width: 180, sortable: false },

  // { field: 'amount', headerName: 'Amount', width: 180 },

  // { field: 'borrower', headerName: 'Borrower', width: 180 },

  //   /* @TODO: Make the Consumer/Business icon to render || hold this.. not sure if I want to show the borrower*/
  // {
  //   field: 'borrower_custom',
  //   headerName: 'Borrower',
  //   width: 180,
  //   sortable: false,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${
  //       (params.getValue(params.id, 'borrower_type') == 'Consumer' && <IconConsumer />) ||
  //       (params.getValue(params.id, 'borrower_type') == 'Business' && <IconBusiness />)
  //     } ${params.getValue(params.id, 'borrower')}`,
  // },

  { field: 'date_issued', headerName: 'Issued', width: 130, resizable: false },
  { field: 'date_listed', headerName: 'Listed', width: 130, resizable: false },
  { field: 'date_maturity', headerName: 'Maturity', width: 140, resizable: false },
  // { field: 'description', headerName: 'Description', width: 180 },
  // { field: 'dti_rating', headerName: 'Dti rating', width: 180 },
  // { field: 'gender', headerName: 'Gender', width: 180 },
  { field: 'amortization', headerName: 'Amortization', width: 180, sortable: false },
  // { field: 'installment', headerName: 'Installment', width: 180, sortable: false },
  { field: 'internal_code', headerName: 'Internal code', width: 180, hide: true },
  // { field: 'protection_scheme', headerName: 'Protection scheme', width: 180 },
  /* @TODO: Fix this crap code, en vez de or, facer que mostren todos os iconos relevantes o contido..
   *  o texto do array xuntao con unha comma... */
  {
    field: 'protection_scheme',
    headerName: 'Protection Scheme',
    width: 100,
    renderCell: (params: GridCellParams) =>
      (params.value === 'Collateral' && <IconProtectionCollateral />) ||
      (params.value === 'BuyBack' && <IconProtectionBuyBack />) ||
      (params.value === 'Personal Guarantee' && <IconProtectionPersonal />) ||
      (params.value === 'Provision Fund' && <IconProtectionFund />),
  },
  { field: 'rating', headerName: 'Rating', width: 130 },
  { field: 'status', headerName: 'Status', width: 130 },

  /* AIR */
  // @TODO: Round this to 2 decimals
  // Check the toLocalString method
  {
    field: 'air',
    headerName: 'AIR',
    width: 100,
    valueFormatter: (params: GridValueFormatterParams) => {
      const valueFormatted = Number((params.value as number) * 100).toLocaleString()
      return `${valueFormatted} %`
    },
  },

  /* XIRR */
  // @TODO: Round this to 2 decimals
  {
    field: 'xirr',
    headerName: 'XIRR',
    width: 110,
    valueFormatter: (params: GridValueFormatterParams) => {
      const valueFormatted = Number((params.value as number) * 100).toLocaleString()
      return `${valueFormatted} %`
    },
  },
] as any

export const LoansList = (props: any) => {
  /* styles */
  const classes = useStyles()
  const { isLoading, rows } = props
  const linkTo = useHistory()
  /* clicking in a row will load the loan details */
  const handleClick = (e: any) => linkTo.push(`/loans/${e.row.id}`)
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
            // components={{
            //   Toolbar: GridToolbar,
            // }}
          />
        </Grid>
      )}
    </Grid>
  )
}
