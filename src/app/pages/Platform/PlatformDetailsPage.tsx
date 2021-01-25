import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core/'
import { connect } from 'react-redux'

import { fetchPlatformDetails, fetchPlatformOriginators } from './state/platformsActions';
import PlatformDetailsToolbar from '../Platform/PlatformDetailsToolbar';
import PlatformInfo from './info/PlatformInfo';

const PlatformDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props
  const { fetchPlatformDetails, fetchPlatformOriginators } = props
  const { platformDetails, loading } = props.platforms

  useEffect(() => {
    fetchPlatformDetails(params.id)
  }, [fetchPlatformDetails, params.id])

  useEffect(() => {
    fetchPlatformOriginators(params.id)
  }, [fetchPlatformOriginators, params.id])

  if (loading) {
    return (
      <>
        <Typography variant='h5'>Loading platform details...</Typography>
      </>
    )
  }
  return (
    <>
      <PlatformDetailsToolbar />
      <PlatformInfo platformDetails={platformDetails} />    
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
