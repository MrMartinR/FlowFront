import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { XGrid, ColDef } from '@material-ui/x-grid'
import { fetchAllCountry } from './state/countriesActions'

const columns: ColDef[] = [
  { field: 'name', headerName: 'Country', width: 200 },
  { field: 'iso_code', headerName: 'ISO', width: 200 },
  { field: 'continent', headerName: 'Continent', width: 200 },
  { field: 'currency_code', headerName: 'Currency Code', width: 200 },
  { field: 'flag', headerName: 'Flag', width: 200 },
  { field: 'fisical_year_start', headerName: 'Fiscal Year', width: 200 },
]

const CountriesList = (props: any) => {
  const { fetchAllCountry, countries } = props
  const { listLoading, countryTable } = countries
  const [data, setData] = React.useState([] as any)

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt['id'] = element.id
      dt['name'] = element.attributes.name
      dt['iso_code'] = element.attributes.iso_code
      dt['continent'] = element.attributes.continent
      dt['currency_code'] = element.attributes.currency.code
      dt['flag'] = element.flag
      dt['fisical_year_start'] = element.fisical_year_start
      data.push(dt)
    })
    return data
  }
  console.log(countryTable.entities)
  useEffect(() => {
    fetchAllCountry()
  }, [fetchAllCountry])

  useEffect(() => {
    setData(processData(countryTable.entities))
  }, [countryTable.entities])

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
          <XGrid rows={data} columns={columns} disableMultipleSelection={true} loading={true} />
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
