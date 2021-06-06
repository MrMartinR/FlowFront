import { Grid, Container, makeStyles } from '@material-ui/core'
import { LendingDetails } from './LendingDetails'

import { LendingToolbar } from './LendingToolbar'
/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export const LendingPage = () => {
  /* styles */
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        <Grid item>
          <LendingToolbar />
        </Grid>
        {/* Menu */}
        <Grid item>
          <LendingDetails />
        </Grid>
      </Grid>
    </Container>
  )
}
