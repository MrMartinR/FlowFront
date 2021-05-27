import React from 'react'
// import { toAbsoluteUrl } from '../../utils'
import { Grid, Typography } from '@material-ui/core'

export const ErrorPage = () => {
  return (
    <Grid>
      {/* <div
        style={{
          backgroundImage: `url(${toAbsoluteUrl('/media/error/error.jpg')})`,
        }}
      > */}
      <Grid>
        <Typography variant="h6">Oops...</Typography>
        <Typography variant="body1">
          Looks like something went wrong.
          <br />
          We&apos;re working on it
        </Typography>
      </Grid>
    </Grid>
  )
}
