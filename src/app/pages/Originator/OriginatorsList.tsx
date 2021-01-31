import React, { useEffect } from 'react'
import { Grid, Card, CardContent, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'
import { fetchOriginatorsList } from './state/originatorsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'trade_name', headerName: 'Name', width: 250 },
  // { field: 'contact', headerName: 'Name', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

const OriginatorsList = (props: any) => {
  const { fetchOriginatorsList } = props
  const { originatorsTable = [], loading } = props.originators
  const [data, setData] = React.useState([] as any)
  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt['id'] = element.id
      dt['customer_category'] = JSON.parse(element.customer_category)
      dt['product_category_business'] = JSON.parse(element.product_category_business)
      dt['product_category_consumer'] = JSON.parse(element.product_category_consumer)
      dt['apr'] = element.apr
      dt['trade_name'] = element.trade_name
      data.push(dt)
    })
    return data
  }

  useEffect(() => {
    fetchOriginatorsList()
  }, [fetchOriginatorsList])

  useEffect(() => {
    setData(processData(originatorsTable))
  }, [originatorsTable])

  if (loading) {
    return (
      <>
        <Typography variant="h5">Loading originators...</Typography>
      </>
    )
  }

  return (
    <Grid container direction="column">
      <Typography variant="h4">Originators</Typography>
      <Grid container direction="column">
        <Card>
          <CardContent>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid rows={data} columns={columns} disableMultipleSelection={true} loading={true} />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: any) => {
  return {
    originators: state.originators,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchOriginatorsList: () => dispatch(fetchOriginatorsList()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginatorsList)
