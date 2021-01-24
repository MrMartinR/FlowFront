import React from 'react'
import { Grid, Card, CardContent, Toolbar, InputBase } from '@material-ui/core'

import PlatformsList from './PlatformsList'

const PlatformsPage = () => {
  return (
    <Grid container direction='column'>
      <Card>
        <Toolbar variant='dense'>
          <InputBase placeholder='Search…' />
        </Toolbar>
      </Card>
      <Card>
        <CardContent>
          <PlatformsList />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default PlatformsPage
