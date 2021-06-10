import { Grid, makeStyles } from '@material-ui/core'
import { HeaderWrapper } from './header/HeaderWrapper'
/* styles */
const useStyles = makeStyles({
  root: {
    width: '99%',
  },
})
export const Layout = ({ children }: any) => {
  /* styles */
  const classes = useStyles()

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item>
        <HeaderWrapper />
      </Grid>

      <Grid item>{children}</Grid>
    </Grid>
  )
}
