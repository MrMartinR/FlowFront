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
          <Typography>
            Here a XGrid with a list Originators related to this particular
            platform. (Platform_Originators Table)
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformOriginators
