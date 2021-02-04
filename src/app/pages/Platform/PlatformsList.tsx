import React, { useEffect } from 'react'
import { Grid, LinearProgress } from '@material-ui/core/'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import PlatformListToolbar from './PlatformListToolbar'
import { fetchPlatformsList } from './state/platformsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
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
]

const PlatformsList = (props: any) => {
  const { fetchPlatformsList } = props
  const { platformsTable = [], loading } = props.platforms

  useEffect(() => {
    fetchPlatformsList()
  }, [fetchPlatformsList])

  const linkTo = useHistory()
  const handleClick = (e: any) => linkTo.push(`/platforms/${e.row.id}`)

  return (
    <>
      {loading ? (
        <Grid container direction="column">
          <LinearProgress color="secondary" />
        </Grid>
      ) : (
        <>
          <PlatformListToolbar />
          <Grid container direction="column">
            <div style={{ height: 600, width: '100%' }}>
              <XGrid
                rows={platformsTable}
                columns={columns}
                onRowClick={handleClick}
                disableMultipleSelection={true}
                loading={true}
              />
            </div>
          </Grid>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformsList: () => dispatch(fetchPlatformsList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformsList)
