import React from 'react'
import { Typography, Grid, Card, Toolbar, InputBase, CardContent } from '@material-ui/core'
import UserLoansList from './UserLoansList'

const UserLoansPage = () => {
  return (
    <>
      <Grid container direction="column">
        <Card>
          <Toolbar variant="dense">
            <InputBase placeholder="Search…" />
          </Toolbar>
        </Card>
        <Card>
          <CardContent>
            <UserLoansList />
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default UserLoansPage
