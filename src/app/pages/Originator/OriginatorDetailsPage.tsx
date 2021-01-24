import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core/'
import OriginatorDetailsToolbar from '../Originator/OriginatorDetailsToolbar'

const OriginatorDetailsPage = () => {
  return (
    <Grid xs={12}>
      <OriginatorDetailsToolbar />
      <Card>
        <CardHeader title='Originator Details'></CardHeader>
        <CardContent>
          <Typography>
            Here Performance/Statistics about the Originator
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default OriginatorDetailsPage
