import React from 'react'
/* eslint-disable no-restricted-imports*/
import { Typography, Card, Grid } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

export const AccountDetails = (props: any) => {
  return (
    <Grid container>
      <Card>
        <Grid item md={11}>
          <Typography variant="h6">Account Details</Typography>
        </Grid>
        <Grid item md={1}>
          <EditIcon>Edit</EditIcon>
        </Grid>
      </Card>
    </Grid>
  )
}
