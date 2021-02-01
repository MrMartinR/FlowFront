import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { XGrid, ColDef } from '@material-ui/x-grid'
import { fetchAllCountry } from './state/countriesActions'

const columns: ColDef[] = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'iso_code', headerName: 'ISO', width: 200 },
  { field: 'continent', headerName: 'Continent', width: 200 },
  { field: 'currency_id', headerName: 'Currency', width: 200 },
  { field: 'flag', headerName: 'Flag', width: 200 },
  { field: 'fisical_year_start', headerName: 'Fiscal Year', width: 200 },
]

const CountriesList = (props: any) => {
  const { fetchAllCountry, countries } = props
  const { listLoading, countryTable } = countries

  useEffect(() => {
    fetchAllCountry()
  }, [fetchAllCountry])

  if (listLoading) {
    return (
      <>
        <Typography variant="h5">Loading countries...</Typography>
      </>
    )
  }
  return (
    <>
      <Grid container direction="column">
        <div style={{ height: 600, width: '100%' }}>
          <XGrid rows={countryTable.entities} columns={columns} disableMultipleSelection={true} loading={true} />
        </div>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    countries: state.countries,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchAllCountry: () => dispatch(fetchAllCountry()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList)
