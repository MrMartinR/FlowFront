import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'

import { PlatformsList } from './PlatformsList'

export const PlatformsPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <PlatformsList />
        </CardContent>
      </Card>
    </Grid>
  )
}
