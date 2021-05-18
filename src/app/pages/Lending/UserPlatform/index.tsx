import React from 'react'
import { Grid } from '@material-ui/core'
import { UserPlatformsList } from './UserPlatformsList'
import { UserPlatformsDetails } from './UserPlatformDetails'
import { UserPlatformsToolbar } from './UserPlatformsToolbar'

export const UserPlatformsPage = () => {
  return (
    <Grid>
      <UserPlatformsToolbar />
      <Grid container direction="row">
        <Grid xs={2}>
          <UserPlatformsList />
        </Grid>
        <Grid xs={10}>
          <UserPlatformsDetails />
        </Grid>
      </Grid>
    </Grid>
  )
}