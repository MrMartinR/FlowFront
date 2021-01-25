import React from 'react'
import { Grid, Button, Typography, Toolbar, Link } from '@material-ui/core/'

const PlatformDetailsToolbar = () => {
  const handleClick = (e: any) => console.log(e.target.value)



  return (
    <Toolbar>
      <Grid container direction='row' justify='space-between'>
        <Grid item xs={4}>
          <Typography variant='h5'>
            [Icon][TradeName]{/* {platformDetails.contact.trade_name} */}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <input type="button" value="Contact" onClick={handleClick} />
          <input type="button" value="Originators" onClick={handleClick} />
          <input type="button" value="Loans" onClick={handleClick} />
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default PlatformDetailsToolbar
