import React from 'react'
import { Toolbar, Grid, Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core'
import { ReactComponent as PlatformIcon } from '../../../common/media/svg/icons/platform.svg'
import { ReactComponent as LendingIcon } from '../../../common/media/svg/icons/lending.svg'
import { ReactComponent as OriginatorIcon } from '../../../common/media/svg/icons/originator.svg'

export const LendingPage = () => {
  return (
    <Grid container xs={12}>
      <Grid item>
        <Typography variant="h4">Lending</Typography>
      </Grid>
      <Grid item>
        <Toolbar>
          <Button variant="outlined" href="/platforms">
            All Platforms
          </Button>
          <Button variant="outlined" href="/originators">
            All Originators
          </Button>
          <Button variant="outlined" href="/loans">
            All Loans
          </Button>
        </Toolbar>
      </Grid>
      <Grid container alignItems="center" spacing={2} justify="space-evenly" alignContent="center">
        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Card>
            <CardHeader title="My Platforms" />
            <CardContent>
              <PlatformIcon />
              <Button variant="outlined" href="/user-platform-overall">
                Platforms
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Card>
            <CardHeader title="My Originators" />
            <CardContent>
              <OriginatorIcon />
              <Button variant="outlined" href="/user-originator">
                Originators
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={2} style={{ textAlign: 'center' }}>
          <Card>
            <CardHeader title="My Loans" />
            <CardContent>
              <LendingIcon />
              <Button variant="outlined" href="/user-loan">
                Loans
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LendingPage
