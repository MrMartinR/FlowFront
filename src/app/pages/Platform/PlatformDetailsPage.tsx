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
  const { platformDetails, loading } = props.platforms
  const [currentTab, setTab] = React.useState('')
  const [data, setData] = React.useState([] as any)

  const processData = (obj: any) => {
    let data = {} as any
    for (const property in obj) {
      data[`${property}`] = property === 'contact' ? obj[property].trade_name : obj[property]
    }
    return data
  }

  useEffect(() => {
    fetchPlatformDetails(params.id)
  }, [fetchPlatformDetails, params.id])

  useEffect(() => {
    setData(processData(platformDetails))
  }, [platformDetails])

  // useEffect(() => {
  //   fetchPlatformOriginators(params.id)
  // }, [fetchPlatformOriginators, params.id])

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
      case 'Originators':
        return <PlatformOriginators />
      case 'Loans':
        return <PlatformLoans />
      case 'Info':
        return <PlatformInfo platformDetails={data} />
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
          <Grid item xs={4}>
            <Typography variant="h4">{data.contact}</Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup>
              <Button onClick={handleClick}>Info</Button>
              <Button onClick={handleClick} disabled>
                Contact
              </Button>
              <Button onClick={handleClick}>Originators</Button>
              <Button onClick={handleClick}>Loans</Button>
            </ButtonGroup>
          </Grid>
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
