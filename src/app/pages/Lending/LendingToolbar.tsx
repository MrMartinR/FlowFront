import { Button, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    maxWidth: '100%',
  },
})
export const LendingToolbar = () => {
  /* styles */
  const classes = useStyles()
  return (
    <Toolbar variant="dense" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Typography variant="h4">Lending</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button href="/platforms">All Platforms</Button>
          <Button href="/originators">All Originators</Button>
          <Button href="/loans">All Loans</Button>
        </Grid>
      </Grid>
    </Toolbar>
  )
}
