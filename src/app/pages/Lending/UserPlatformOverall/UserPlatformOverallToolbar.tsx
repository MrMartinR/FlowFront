import { Grid, Typography, Toolbar, Button } from '@material-ui/core/'

export const UserPlatformOverallToolbar = (props: any) => {
  return (
    <Toolbar variant="dense">
      <Grid container direction="row" justify="space-between">
        <Grid item xs={6}>
          <Typography variant="h5">User Platforms</Typography>
        </Grid>
        <Grid item xs={6}>
            <Button variant="outlined" href="/user-platform">
                Individual Performance
            </Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}
