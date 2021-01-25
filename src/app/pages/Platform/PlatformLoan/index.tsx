import React from 'react'
import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core/'
const PlatformLoans = () => {
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title="Platform Loans"></CardHeader>
        <CardContent>
          <Typography>Here a XGrid with a list Loans related to this particular platform.</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformLoans
