import React, { useEffect, useState } from 'react'
import { Grid, LinearProgress } from '@material-ui/core/'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { XGrid, LicenseInfo, GridColDef } from '@material-ui/x-grid'
import PlatformListToolbar from './PlatformListToolbar'
import * as platformsActions from './state/platformsActions'
import { RootState } from '../../../redux/rootReducer'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: GridColDef[] = [
  { field: 'trade_name', headerName: 'Platform', width: 200 },
  { field: 'status', headerName: 'Status', width: 100 },
  { field: 'liquidity', headerName: 'Liquidity', width: 130 },
  { field: 'account_category', headerName: 'Account Category', width: 130 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'cost', headerName: 'Cost', width: 130 },
  { field: 'invest_mode', headerName: 'Invest Mode', width: 130 },
  { field: 'min_investment', headerName: 'Min Investment', width: 130 },
  { field: 'protection_scheme', headerName: 'Protection Scheme', width: 130 },
  { field: 'secondary_market', headerName: 'Secondary Market', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'term', headerName: 'Term', width: 130 },
  { field: 'promo', headerName: 'Promo', width: 130 },
  { field: 'welcome_bonus', headerName: 'Welcome Bonus', width: 130 },
  { field: 'taxes', headerName: 'Taxes', width: 130 },
]

export const PlatformsList = (props: any) => {
  const [list, setList] = useState([] as any)
  const [isLoading, setIsLoading] = useState(true)
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.platforms,
    }),
    shallowEqual
  )
  const GetAllPlatforms = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(platformsActions.fetchPlatformsList());
      } 
    }, [dispatch])
  }
  GetAllPlatforms();

  useEffect(() => { if (
    currentState.platformsTable
    ) {
      setList(currentState.platformsTable);
    }
  }, [currentState.platformsTable]);
  const rows = [] as any;
  if (list.length >1) list.map((platform: any) => {
    const newRow = {
      id : platform.id,
      type: platform.type,
      trade_name: platform.attributes.contact?.trade_name||'',
      status: platform.attributes.status,
      liquidity: platform.attributes.liquidity,
      account_category: platform.attributes.account_category,
      category: null,
      cost: platform.attributes.cost,
      invest_mode: null,
      min_investment: platform.attributes.min_investment,
      protection_scheme: platform.attributes.protection_scheme,
      secondary_market: platform.attributes.secondary_market,
      structure: platform.attributes.structure,
      term: platform.attributes.term,
      promo: platform.attributes.promo,
      welcome_bonus: platform.attributes.welcome_bonus,
      taxes: platform.attributes.taxes
    }
    rows.push(newRow);
    return rows;
  })
  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/platforms/${e.row.id}`)

  useEffect( () => {
    setIsLoading(currentState.loading);
  }, [currentState.loading]);

  return (
    <>
      {isLoading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <PlatformListToolbar list = { rows }/>
          <Grid container direction="column">
            <div style={{ height: 600, width: '100%' }}>
              <XGrid
                
                rows={rows}
                columns={columns}
                onRowClick={handleClick}
                disableMultipleSelection={true}
                loading={isLoading}
              />
            </div>
          </Grid>
        </>
      )}
    </>
  )
}