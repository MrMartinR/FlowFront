import { Grid, Typography, Toolbar, Button, makeStyles } from '@material-ui/core/'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxWidth: '100%',
  },
})
export const UserPlatformOverallToolbar = (props: any) => {
  /* styles */
  const classes = useStyles()
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h4">User Platforms</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" href="/user-platform">
            Individual Performance
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}
