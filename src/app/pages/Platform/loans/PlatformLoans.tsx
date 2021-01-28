import React from 'react'
import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core/'

const PlatformLoans = () => {
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title="Platform Loans"></CardHeader>
        <CardContent>
          <Typography variant="h5">
            Platform Loans page. I.e A list of loans related to a particular platform.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformLoans
