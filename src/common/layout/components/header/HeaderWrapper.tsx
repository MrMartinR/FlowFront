import { HeaderMenu } from './HeaderMenu'
import { makeStyles, Grid, CardMedia, AppBar, IconButton } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg'
import { SignOut } from './SignOut'

/* styles */
const useStyles = makeStyles({
  root: {
    background: '#f1f1f1',
  },
  cardMedia: {
    maxWidth: 36,
  },
})

export const HeaderWrapper = () => {
  /* styles */
  const classes = useStyles()

  return (
    // begin::MainContainer
    <AppBar position="sticky" elevation={0} className={classes.root}>
      <Grid container justify="flex-end" alignItems="center" alignContent="center" spacing={2}>
        {/* logo  */}
        <Grid item xs={1}>
          <IconButton href="/dashboard">
            <CardMedia src={Logo} component="img" className={classes.cardMedia} />
          </IconButton>
        </Grid>

        {/* main menu  */}
        <Grid item xs={10}>
          <HeaderMenu />
        </Grid>

        {/* signout button  */}
        <Grid item xs={1}>
          <SignOut />
        </Grid>

        {/* end::MainContainer */}
      </Grid>
    </AppBar>
  )
}
