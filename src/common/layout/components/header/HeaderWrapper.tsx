import React from 'react'
import { HeaderMenu } from './HeaderMenu'
import { Grid, CardMedia, AppBar } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg';
import SignOut from './SignOut'


function HeaderWrapper() {

  return (
    // begin::MainContainer
    <AppBar position="fixed">
          <Grid 
          container
          alignItems='center'
          direction='row'
          spacing={2}
          >
      {/* logo  */}
          <Grid item xs={1} >
            <CardMedia 
              src={Logo} 
              component="img"
              />
          </Grid>

      {/* main menu  */}
          <Grid item xs={10} >
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

export default HeaderWrapper
