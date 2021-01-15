import React from 'react'
import { Grid, Card, CardContent, Toolbar, InputBase } from '@material-ui/core'

import OriginatorsTab from './OriginatorsTab'

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

export default OriginatorsPage;

