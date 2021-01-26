import React, { useEffect } from 'react'
import { Typography, Grid, Toolbar } from '@material-ui/core/'
import { connect } from 'react-redux'

import { fetchPlatformDetails, fetchPlatformOriginators } from './state/platformsActions';
import PlatformInfo from './info/PlatformInfo';
import PlatformContacts from './contacts/PlatformContacts';
import PlatformOriginators from './originators/PlatformOriginators';
import PlatformLoans from './loans/PlatformLoans';



const PlatformDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props
  const { fetchPlatformDetails, fetchPlatformOriginators } = props
  const { platformDetails, loading } = props.platforms
  const [currentTab, setTab] = React.useState('')

  useEffect(() => {
    fetchPlatformDetails(params.id)
  }, [fetchPlatformDetails, params.id])

  useEffect(() => {
    fetchPlatformOriginators(params.id)
  }, [fetchPlatformOriginators, params.id])

  // onClick function that sets the state of the currentTab to be displayed
  const handleClick = (e: any) => {
    setTab(`${e.target.value}`)
  }

  // a function that returns a switch statement of the details, contact, originators and loans tab
  const renderSwitch = (param: any) => {
    switch (param) {
      case 'Contacts':
        return (<PlatformContacts />)
      case 'Originators':
        return (<PlatformOriginators />)
      case 'Loans':
        return (<PlatformLoans />)
      default:
        return (<PlatformInfo platformDetails={platformDetails} />)
    }
  }

  
  if (loading) {
    return (
      <>
        <Typography variant='h5'>Loading platform details...</Typography>
      </>
    )
  }
  return (
    <>
      <Toolbar>
        <Grid container direction='row' justify='space-between'>
          <Grid item xs={4}>
            <input type="button" value="[Icon][TradeName]" onClick={handleClick} />
            {/* {platformDetails.contact.trade_name} */}
          </Grid>
          <Grid item xs={3}>
            <input type="button" value="Contacts" onClick={handleClick} />
            <input type="button" value="Originators" onClick={handleClick} />
            <input type="button" value="Loans" onClick={handleClick} />
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
    fetchPlatformDetails: (platformId: any) =>
      dispatch(fetchPlatformDetails(platformId)),
  
    fetchPlatformOriginators: (platformId: any) =>
      dispatch(fetchPlatformOriginators(platformId)),
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailsPage)
