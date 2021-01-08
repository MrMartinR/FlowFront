import React from 'react'
import { HeaderMenu } from './HeaderMenu'
import { Grid, CardMedia } from '@material-ui/core'
import Logo from '../../../../common/media/flow-logo.svg';
import SignOut from './SignOut'


function HeaderMenuWrapper() {

  return (
    // begin::MainContainer
    <Grid 
      container
      alignItems='center'
      xs={12} 
      direction='row'
      spacing={2}
      >
{/* logo  */}
      <Grid item xs={1}>
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
  )
}

export default HeaderMenuWrapper
