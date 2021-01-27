import React from 'react'
import { Grid, Toolbar, Typography, Link, Button } from '@material-ui/core'
import UserPlatformsList from './UserPlatformsList'
import UserPlatformDetails from './UserPlatformDetails'

const UserPlatformsPage = () => {
  return (
    <Grid>
      <Toolbar>
        <Link href='/lending' color='inherit'>
          Lending
        </Link>
        &gt;
        <Link href='/user-platforms' color='inherit'>
          Platforms
        </Link>
        <Typography>----Yep, I am the main toolbar----</Typography>
        <Button variant='outlined' href='/user-platform-overall'>
          Overall Performance
        </Button>
      </Toolbar>

      <Grid container direction='row'>
        <Grid xs={3}>
          <UserPlatformsList />
        </Grid>
        <Grid xs={9}>
          <UserPlatformDetails />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserPlatformsPage
