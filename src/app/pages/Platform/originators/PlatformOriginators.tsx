import React, { useEffect } from 'react'
import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core/'
import { XGrid, LicenseInfo, ColDef } from '@material-ui/x-grid'

// import { connect } from 'react-redux'

LicenseInfo.setLicenseKey(
  'f5993f18c3d54fd37b1df54757440af5T1JERVI6MjAwMjIsRVhQSVJZPTE2NDE3MTI0NTQwMDAsS0VZVkVSU0lPTj0x'
)

const columns: ColDef[] = [
  // column definition format here
  { field: 'originator_id', headerName: 'Originator Id', width: 250 },
  { field: 'customer_category', headerName: 'Customer', width: 250 },
  { field: 'product_category_business', headerName: 'Business', width: 250 },
  { field: 'product_category_consumer', headerName: 'Consumer', width: 350 },
  { field: 'apr', headerName: 'APR', width: 100 },
] as any

const PlatformOriginators = (props: any) => {
  const { platformOriginators } = props

  // const [data, setData] = React.useState([] as any)
  // const processData = (arr: any) => {
  //   let data = [] as any
  //   arr.forEach((element: any) => {
  //     let dataObj = {} as any
  //     for (const property in element) {
  //       if (property === 'originator') {
  //           dataObj['originator_id'] = element[property].id
  //           dataObj['customer_category'] = element[property].customer_category
  //           dataObj['product_category_business'] = element[property].product_category_business
  //           dataObj['product_category_consumer'] = element[property].product_category_consumer
  //           dataObj['apr'] = element[property].apr
  //       }
  //     }
  //     data.push(dataObj)

  //     // dt['id'] = element.id
  //     // dt['customer_category'] = JSON.parse(element.customer_category)
  //     // dt['product_category_business'] = JSON.parse(element.product_category_business)
  //     // dt['product_category_consumer'] = JSON.parse(element.product_category_consumer)
  //     // dt['apr'] = element.apr
  //     // dt['contact'] = element.contact.trade_name || 'Not found'
  //     // data.push(dt)
  //   })
  //   return data
  // }

  useEffect(() => {
    // setData(processData(platformOriginators))
    console.log(platformOriginators)
  }, [platformOriginators])

  return (
    <Grid xs={12}>
      <CardHeader title="Platform Originators"></CardHeader>
      <Grid container direction="column">
        <div style={{ height: 600, width: '100%' }}>
          <XGrid
            rows={platformOriginators}
            columns={columns}
            // onRowClick={handleClick}
            disableMultipleSelection={true}
            loading={true}
          />
        </div>
      </Grid>
    </Grid>
  )
}

// const mapStateToProps = (state: any) => {
//   return {
//     platforms: state.platforms
//   }
// }
export default PlatformOriginators
