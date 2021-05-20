import { useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core/'
import { XGrid, GridColDef, LicenseInfo } from '@material-ui/x-grid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as currenciesActions from './state/currenciesActions'
import { useHistory } from 'react-router'
import { CurrencyToolBar } from './CurrencyToolbar'
import { CurrencyAlert } from './CurrencyAlert'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'symbol', headerName: 'Symbol', width: 200 },
  { field: 'code', headerName: 'Code', width: 200 },
  { field: 'kind', headerName: 'Kind', width: 200 },
  { field: 'fx_eur', headerName: 'fx_eur', width: 200 },
  { field: 'decimal_places', headerName: 'Decimal Places', width: 200 },

]

export const CurrenciesList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState )=> ({
      currentState: state.currencies,
    }),
    shallowEqual
  )
  const GetAllCurrencies = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(currenciesActions.getAllCurrencies());
      } 
    }, [dispatch])
  }
  GetAllCurrencies();
  useEffect(() => { if (
    currentState.currenciesTable
    ) {
      setList(currentState.currenciesTable.entities);
    }
  }, [currentState.currenciesTable]);

  const rows = [] as any;
  if (list.length >1) list.map((currency: any) => {
    const newRow = {
      id : currency.id,
      type: currency.type,
      name: currency.attributes.name,
      code: currency.attributes.code,
      symbol: currency.attributes.symbol,
      kind: currency.attributes.kind,
      fx_eur: currency.attributes.fx_eur,
      decimal_places: currency.attributes.decimal_places,
    }
    rows.push(newRow);
    return rows;
  })
  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/currencies/${e.row.id}`)
  useEffect( () => {
    setIsLoading(currentState.listLoading);
  }, [currentState.listLoading]);
  return (
    <>
      {isLoading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <CurrencyToolBar list = { rows }/>
          <CurrencyAlert />
          <Grid container direction="column">
            <div style={{ height: 600, width: '100%' }}>
              <XGrid 
                rows={rows} 
                columns={columns}
                onRowClick={handleClick}
                disableMultipleSelection={true} 
                loading={isLoading} />
            </div>
          </Grid>
        </>
      )}
    </>
  )
}