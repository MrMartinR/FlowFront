import { makeStyles, Container, Grid } from '@material-ui/core'
import { PlatformListToolbar } from './PlatformListToolbar'
import { PlatformsList } from './PlatformsList'

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

export const PlatformsPage = () => {
  /* styles */
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container direction="column" spacing={1}>
        {/* toolbar */}
        {/* <PlatformListToolbar list={rows} /> */}
        {/* table */}
        <Grid item xs={12}>
          <PlatformsList />
        </Grid>
      </Grid>
    </Container>
  )
}
