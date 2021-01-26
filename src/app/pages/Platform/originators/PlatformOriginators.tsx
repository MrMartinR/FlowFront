import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core/'

const PlatformOriginators = () => {
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title='Platform Originators'></CardHeader>
        <CardContent>
        <Typography variant='h5'>
            Platform Originators page.

            I.e A list of originators related to a particular platform.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformOriginators
