import React from 'react'
import { Grid, Toolbar, Typography, Link, Button } from '@material-ui/core'
import UserPlatformsOverall from './UserPlatformOverall'

const UserPlatformsOverallPage = () => {
  return (
    <Grid>
      <Toolbar>
        <Link href='/lending' color='inherit'>
          Lending
        </Link>
        &gt;
        <Link href='/user-platforms-overall' color='inherit'>
          Platforms Overall
        </Link>
        <Typography>----Yep, I am the main toolbar-----</Typography>
        <Button variant='outlined' href='/user-platform'>
          Individual Performance
        </Button>
      </Toolbar>

      <Grid container direction='row'>
        <UserPlatformsOverall />
      </Grid>
    </Grid>
  )
}

export default UserPlatformsOverallPage
