import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  ButtonGroup,
  Button,
} from '@material-ui/core/'
import { connect } from 'react-redux'

import { fetchPlatformDetails } from './state/platformsActions';
import PlatformDetailsToolbar from '../Platform/PlatformDetailsToolbar';
import PlatformInfo from './info/PlatformInfo';

const PlatformDetailsPage = (props: any) => {
  const {
    match: { params },
  } = props
  const { fetchPlatformDetails } = props
  const { platformDetails, loading } = props.platforms

  useEffect(() => {
    fetchPlatformDetails(params.id)
  }, [fetchPlatformDetails, params.id])

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformDetailsPage)
