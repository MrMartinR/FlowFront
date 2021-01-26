import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core/'


const PlatformContacts = () => {
  return (
    <Grid xs={12}>
      <Card>
        <CardHeader title='Platform Contacts'></CardHeader>
        <CardContent>
          <Typography variant='h5'>
            Platform Contacts page.

            I.e A list of contacts related to a particular platform.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default PlatformContacts
