import { Grid, Card, CardHeader, Typography, CardContent } from '@material-ui/core'
import { UserPlatformOverallToolbar } from './UserPlatformOverallToolbar'

export const UserPlatformsOverall = () => {
  return (
    <>
      <UserPlatformOverallToolbar/>
      <CardHeader title="User Platform Overall Performance"></CardHeader>
      <Grid container direction="row" justify="space-between">
        <Grid container direction="column" xs={12}>
          <Card>
            <CardContent>
              <Typography>
                Here the performance of all the user_platforms, Total loans, active loans, status active loans, XIRR,
                etc
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
