import React from 'react'
import { HeaderMenu } from './HeaderMenu'
import { Grid, CardMedia, AppBar, IconButton } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg';
import SignOut from './SignOut'




function HeaderWrapper() {

  const style = {
    // height: 40,
    // padding: 5, 
    maxWidth: 36,
    // paddingLeft: '36%'
  };

  return (
    // begin::MainContainer
    <AppBar position="sticky">
      <Grid
        container
        justify='flex-end'
        alignItems='center'
        alignContent='center'
        direction='row'
        spacing={2}
      >
        {/* logo  */}
        <Grid item xs={1} >
          <IconButton href="/dashboard">
            <CardMedia
              src={Logo}
              component="img"
              style={style}
            />
          </IconButton>

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
