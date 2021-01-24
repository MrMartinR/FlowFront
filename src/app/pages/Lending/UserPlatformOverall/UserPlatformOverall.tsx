import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'

const UserPlatformsOverall = () => {
  return (
    <Grid>
      <Card>
        <CardHeader title='User Platform Overall Performance'></CardHeader>
        <CardContent>
          <Typography>
            Here the performance of all the user_platforms, Total loans, active
            loans, status active loans, XIRR, etc
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserPlatformsOverall
