import React from 'react'
import { Grid, Card, CardContent, InputBase } from '@material-ui/core'

import PlatformsList from './PlatformsList'

const PlatformsPage = () => {
  return (
    <Grid container direction='column'>
      <Card></Card>
      <Card>
        <CardContent>
          <PlatformsList />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PlatformsPage
