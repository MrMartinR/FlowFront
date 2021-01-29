import React, { useEffect } from 'react'
import { Typography, Grid, Toolbar, ButtonGroup, Button } from '@material-ui/core/'
import { connect } from 'react-redux'

import PlatformInfo from './info/PlatformInfo'
import PlatformOriginators from './originators/PlatformOriginators'
import PlatformLoans from './loans/PlatformLoans'
import { fetchPlatformDetails, fetchPlatformOriginators, fetchPlatformLoans } from './state/platformsActions'

const PlatformDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props
  const { fetchPlatformDetails, fetchPlatformOriginators, fetchPlatformLoans } = props
  const { platformDetails, platformOriginators, loading } = props.platforms
  const [currentTab, setTab] = React.useState('')
  const [data, setData] = React.useState([] as any)
  const [originatorsData, setOriginatorsData] = React.useState([] as any)

  const processData = (obj: any) => {
    let data = {} as any
    for (const property in obj) {
      data[`${property}`] = property === 'contact' ? obj[property].trade_name : obj[property]
    }
    return data
  }

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
    fetchPlatformDetails(params.id)
  }, [fetchPlatformDetails, params.id])

  useEffect(() => {
    setData(processData(platformDetails))
  }, [platformDetails])

  useEffect(() => {
    fetchPlatformOriginators(params.id)
  }, [fetchPlatformOriginators, params.id])

  useEffect(() => {
    setOriginatorsData(processOriginatorData(platformOriginators))
  }, [platformOriginators])

  // useEffect(() => {
  //   fetchPlatformLoans(params.id)
  // }, [fetchPlatformLoans, params.id])

  /* onClick function that sets the state of the currentTab to be displayed */
  const handleClick = (e: any) => {
    setTab(`${e.target.innerHTML}`)
  }

  /* a function that returns a switch statement of the details, contact, originators and loans tab */
  const renderSwitch = (param: any) => {
    switch (param) {
      case 'Info':
        return <PlatformInfo platformDetails={data} />
      case 'Originators':
        return <PlatformOriginators platformOriginators={originatorsData} />
      case 'Loans':
        return <PlatformLoans />
      case 'Contact':
      default:
        return <PlatformInfo platformDetails={data} />
    }
  }

  if (loading) {
    return (
      <>
        <Typography variant="h5">Loading platform details...</Typography>
      </>
    )
  }
  return (
    <>
      <Toolbar>
        <Grid container direction="row" justify="space-between">
          <Grid item xs={4} direction="row">
            <Typography variant="h4">{data.contact}</Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button onClick={handleClick}>Info</Button>
              <Button onClick={handleClick}>Originators</Button>
              <Button onClick={handleClick}>Loans</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Button href={`/contacts/${data.contact_id}`} disabled>
            Contact
          </Button>
        </Grid>
      </Toolbar>
      {/* render a switch statement passing in the currentTab state as the key */}
      {renderSwitch(currentTab)}
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
    fetchPlatformDetails: (platformId: any) => dispatch(fetchPlatformDetails(platformId)),

    fetchPlatformOriginators: (platformId: any) => dispatch(fetchPlatformOriginators(platformId)),

    fetchPlatformLoans: (platformId: any) => dispatch(fetchPlatformLoans(platformId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailsPage)
