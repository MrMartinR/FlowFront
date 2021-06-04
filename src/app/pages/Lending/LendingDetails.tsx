import { Button, Card, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core'
import { ReactComponent as PlatformIcon } from '../../../common/media/svg/icons/platform.svg'
import { ReactComponent as LendingIcon } from '../../../common/media/svg/icons/lending.svg'
import { ReactComponent as OriginatorIcon } from '../../../common/media/svg/icons/originator.svg'
/* styles */
const useStyles = makeStyles({
  root: {
    textAlign: 'center',
  },
})
export const LendingDetails = () => {
  /* styles */
  const classes = useStyles()
  return (
    <Grid container alignItems="center" justify="space-evenly" alignContent="center">
      <Grid item xs={2} className={classes.root}>
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

      <Grid item xs={2} className={classes.root}>
        <Card>
          <CardHeader title="My Originators" />
          <CardContent>
            <OriginatorIcon />
            <Button variant="outlined" href="/user-originators">
              Originators
            </Button>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={2} className={classes.root}>
        <Card>
          <CardHeader title="My Loans" />
          <CardContent>
            <LendingIcon />
            <Button variant="outlined" href="/user-loans">
              Loans
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
