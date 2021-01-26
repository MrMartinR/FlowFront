import React from "react"
import { Grid, Card, CardContent, Toolbar, InputBase } from '@material-ui/core'

import UserPlatformList from './UserPlatformList'

const UserPlatformPage = () => {
  return (
    <Grid container direction="column">
    <Card>
      <Toolbar variant="dense">
        <InputBase placeholder="Search…" />
      </Toolbar>
    </Card>   
    <Card>
      <CardContent>
        <UserPlatformList />
      </CardContent>
    </Card>
  </Grid>
  );
}

export default UserPlatformPage;
