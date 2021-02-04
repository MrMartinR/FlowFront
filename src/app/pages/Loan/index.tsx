import React from 'react'
import { Grid, Card, CardContent, Toolbar, InputBase } from '@material-ui/core'

import LoansList from './LoansList'

const LoansPage = () => {
  return (
    <Grid container direction="column">
      <Card>
        <Toolbar variant="dense">
          <InputBase placeholder="Search…" />
        </Toolbar>
      </Card>
      <Card>
        <CardContent>
          <LoansList />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default LoansPage
