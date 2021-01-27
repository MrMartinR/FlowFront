import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'

const UserPlatformsDetail = () => {
  return (
    <Grid>
      <Card>
        <CardHeader title='User Platform Performance'></CardHeader>
        <CardContent>
          <Typography>
            Here the performance of the selected platform, Total loans, active
            loans, status active loans, XIRR, etc
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserPlatformsDetail
