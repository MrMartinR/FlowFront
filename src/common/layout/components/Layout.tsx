
import { Grid } from '@material-ui/core'
import { HeaderWrapper } from './header/HeaderWrapper'

// TODO: adding type any to children
export const Layout = ({ children }: any) => {
return(
      <Grid container direction="column" style = {{ width : '99%' }}>
        <Grid item>
          <HeaderWrapper />
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    
  )
}
