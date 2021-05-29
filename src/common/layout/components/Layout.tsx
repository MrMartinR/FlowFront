import { Grid } from '@material-ui/core'
import { HeaderWrapper } from './header/HeaderWrapper'

export const Layout = ({ children }: any) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <HeaderWrapper />
      </Grid>

      <Grid item>{children}</Grid>
    </Grid>
  )
}
