import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core/'
import { connect } from 'react-redux'
import { XGrid, ColDef } from '@material-ui/x-grid'
import { fetchAllCountry } from './state/countriesActions'
// import CountryForm from './Form/countryForm'
// import { Paper, makeStyles } from '@material-ui/core';

const columns: ColDef[] = [
  { field: 'name', headerName: 'Country', width: 200 },
  { field: 'iso_code', headerName: 'ISO', width: 200 },
  { field: 'continent', headerName: 'Continent', width: 200 },
  { field: 'currency_code', headerName: 'Currency Code', width: 200 },
  { field: 'flag', headerName: 'Flag', width: 200 },
  { field: 'fisical_year_start', headerName: 'Fiscal Year', width: 200 },
]

// const useStyles = makeStyles(theme => ({
//   pageContent: {
//       margin: theme.spacing(5),
//       padding: theme.spacing(3)
//   }
// }))

const CountriesList = (props: any) => {
  const { fetchAllCountry, countries } = props
  const { listLoading, countryTable } = countries
  const [data, setData] = React.useState([] as any)

  // const classes = useStyles();

  const processData = (arr: any) => {
    let data = [] as any
    arr.forEach((element: any) => {
      let dt = {} as any
      dt['id'] = element.id
      dt['name'] = element.name
      dt['iso_code'] = element.iso_code
      dt['continent'] = element.continent
      dt['currency_code'] = element.currency.code
      dt['flag'] = element.flag
      dt['fisical_year_start'] = element.fisical_year_start
      data.push(dt)
    })
    return data
  }

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
      {/* <Paper className={classes.pageContent}> 
        <CountryForm />       
      </Paper> */}
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
