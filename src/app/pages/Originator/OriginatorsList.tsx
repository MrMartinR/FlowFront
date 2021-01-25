/* eslint-disable */
import React, { useEffect } from 'react'
import { Grid, Card, CardContent } from '@material-ui/core/'
import { connect } from 'react-redux'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'

import { fetchOriginatorsList } from './state/originatorsActions'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'contact', headerName: 'Contact', width: 70 },
  { field: 'customer_category', headerName: 'Customer category', width: 220 },
  { field: 'product_category_bussiness', headerName: 'Product category business', width: 180 },
  { field: 'product_category_consumer', headerName: 'Productor category consumer', width: 240 },
  { field: 'apr', headerName: 'Apr', width: 70 }
] as any

const OriginatorsList = (props: any) => {
  const { originatorsTable = [], loading } = props.originators

  useEffect(() => {
    props.fetchOriginatorsList()
  }, [])

  if (loading) {
    return (
      <div>
        <h1>Loading originators...</h1>
      </div>
    )
  }

  return (
    <>
      <Grid container direction="column">
        <Card>
          <CardContent>
            <h3>Originators</h3>
            <div style={{ height: 600, width: '100%' }}>
              <XGrid rows={originatorsTable} columns={columns} checkboxSelection />
            </div>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    originators: state.originators
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchOriginatorsList: () => dispatch(fetchOriginatorsList())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginatorsList)
