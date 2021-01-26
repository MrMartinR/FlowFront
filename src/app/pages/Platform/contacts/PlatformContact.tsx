import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core/'


const PlatformContact = () => {
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title='Platform Contact'></CardHeader>
        <CardContent>
          <Typography variant='h5'>
            Platform Contact page.

            I.e The contact related to a particular platform.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformContact
