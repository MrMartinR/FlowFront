import React from 'react'
import { connect } from 'react-redux'

import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'

const UserPlatformsDetails = (props: any) => {
  const { userPlatformDetails, loading } = props.userPlatforms

  if (loading) {
    return (
      <>
        <CardHeader title='Loading user platform...'></CardHeader>
      </>
    )
  }

  return (
    <>
        <CardHeader title='User Platform Performance'></CardHeader>
        <Grid container direction='row' justify='space-between'>
          <Grid container direction='column' xs={12}>
            <Card>
              <CardContent>
                  {userPlatformDetails.length < 1 ? (
                  <Typography>Click a platform to load performance</Typography> ) : (
                  <>
                    <Typography>User platform Id: {userPlatformDetails.id}</Typography>
                    <Typography>User id: {userPlatformDetails.user.id}</Typography>
                    <Typography>Platform id: {userPlatformDetails.platform.id}</Typography>
                  </>
                  )  }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userPlatforms: state.userPlatforms,
  }
}

export default connect(mapStateToProps)(UserPlatformsDetails)
