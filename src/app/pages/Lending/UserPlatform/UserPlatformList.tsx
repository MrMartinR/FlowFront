import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core'

const UserPlatformsList = () => {
  return (
    <Grid>
      <Card>
        <CardHeader title='User Platforms'></CardHeader>
        <CardContent>
          <Typography>
            Here a list/table/menu with a list of platforms related to the user
            (user_platforms table) Click on a row and load the details in the
            right part.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UserPlatformsList
