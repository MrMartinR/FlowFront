import React from 'react'
import { Grid } from '@material-ui/core/'
import CountriesList from './CountryList'
import CountryToolbar from './CountryToolbar'

const CountriesPage = () => {
  return (
    <Grid container direction="column">
      <CountryToolbar />
      <CountriesList />
    </Grid>
  )
}

export default CountriesPage
