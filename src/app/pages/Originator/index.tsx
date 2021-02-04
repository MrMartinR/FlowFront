import React from 'react'
import { Grid, Card, CardContent } from '@material-ui/core'

import OriginatorsTab from './OriginatorsList'

const OriginatorsPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <CardContent>
          <OriginatorsTab />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default OriginatorsPage
