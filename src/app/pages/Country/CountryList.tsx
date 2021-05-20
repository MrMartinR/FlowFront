import { useEffect, useState } from 'react'
import { Avatar, Grid, LinearProgress } from '@material-ui/core/'
import { XGrid, GridColDef, LicenseInfo, GridCellParams } from '@material-ui/x-grid'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import * as countriesActions from './state/countriesActions'
import { CountryToolbar } from './CountryToolbar'
import { CountryAlert } from './CountryAlert'
import { useHistory } from 'react-router'
LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'iso_code', headerName: 'ISO', width: 200 },
  { field: 'continent', headerName: 'Continent', width: 200 },
  { field: 'currency', headerName: 'Currency', width: 200 },
  { field: 'flag', headerName: 'Flag', width: 100, renderCell: (params: GridCellParams) => (
    <strong>
      <Avatar variant="square"><img src={'/media/svg/flags/'+params.value+'.svg'} alt="" /></Avatar>
    </strong>
  ),},
  { field: 'fiscal_year_start', headerName: 'Fiscal Year', width: 200 },
]

export const CountriesList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.countries,
    }),
    shallowEqual
  )
  const GetAllCountries = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(countriesActions.fetchCountries());
      } 
    }, [dispatch])
  }
  GetAllCountries();
  useEffect(() => { if (
    currentState.countryTable
    ) {
      setList(currentState.countryTable.entities);
    }
  }, [currentState.countryTable]);

  const rows = [] as any;
  if (list.length >1) list.map((country: any) => {
    const newRow = {
      id : country.id,
      type: country.type,
      name: country.attributes.name,
      iso_code: country.attributes.iso_code,
      continent: country.attributes.continent,
      currency: `${country.attributes.currency.name} [${country.attributes.currency.code}]`,
      flag: country.attributes.iso_code,
      fiscal_year_start: country.attributes.fiscal_year_start,
    }
    rows.push(newRow);
    return rows;
  })
  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/countries/${e.row.id}`)
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
          <CountryToolbar list = { rows }/>
          <CountryAlert />
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
