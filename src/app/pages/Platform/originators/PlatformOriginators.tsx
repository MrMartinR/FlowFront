import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography } from '@material-ui/core/'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import { fetchPlatformOriginators } from '../state/platformsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Originator Id', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

const PlatformOriginators = (props: any) => {
  const { fetchPlatformOriginators } = props
  const { platformOriginators, loading } = props.platforms
  const [originatorsData, setOriginatorsData] = React.useState([] as any)

  const processOriginatorData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dataObj = {} as any
      for (const property in element) {
        if (property === 'originator') {
          dataObj['id'] = element[property].id
          dataObj['customer_category'] = JSON.parse(element[property].customer_category)
          dataObj['product_category_business'] = JSON.parse(element[property].product_category_business)
          dataObj['product_category_consumer'] = JSON.parse(element[property].product_category_consumer)
          dataObj['apr'] = element[property].apr
        }
      }
      data.push(dataObj)
    })
    return data
  }

  useEffect(() => {
    fetchPlatformOriginators(props.id)
  }, [fetchPlatformOriginators, props.id])

  useEffect(() => {
    setOriginatorsData(processOriginatorData(platformOriginators))
  }, [platformOriginators])

  if (loading) {
    return (
      <>
        <Typography variant="h5">Loading platform originators...</Typography>
      </>
    )
  }
  return (
    <Grid xs={12}>
      <Grid container direction="column">
        <div style={{ height: 600, width: '100%' }}>
          <XGrid rows={originatorsData} columns={columns} disableMultipleSelection={true} loading={true} />
        </div>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: any) => {
  return {
    platforms: state.platforms,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPlatformOriginators: (platformId: any) => dispatch(fetchPlatformOriginators(platformId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformOriginators)
