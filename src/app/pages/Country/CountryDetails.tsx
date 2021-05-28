import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { CountryAlert } from './CountryAlert'
import { CountryDetailsToolbar } from './CountryDetailsToolbar'
import * as countriesActions from './state/countriesActions'
export const CountryDetails = (props: any) => {
  const { params } = props.match
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.countries,
    }),
    shallowEqual
  )
  const [countryDetails, setCountryDetails] = useState({} as any)
  const GetCountry = () => {
    let dispatch = useDispatch()
    useEffect(() => {
      if (dispatch) {
        dispatch(countriesActions.fetchCountry(params.id))
      }
    }, [dispatch])
  }
  GetCountry()
  useEffect(() => {
    currentState.singleCountry && setCountryDetails(currentState.singleCountry)
  }, [currentState.singleCountry])

  return (
    <>
      <CountryDetailsToolbar name={countryDetails.attributes?.name} iso_code={countryDetails.attributes?.iso_code} />
      <CountryAlert />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Continent"></CardHeader>
            <CardContent>
              <Typography>{countryDetails.attributes?.continent}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Currency"></CardHeader>
            <CardContent>
              <Typography>Name {countryDetails.attributes?.currency.name}</Typography>
              <Typography>Code {countryDetails.attributes?.currency.code}</Typography>
              <Typography>Symbol {countryDetails.attributes?.currency.symbol}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Fiscal Year Start"></CardHeader>
            <CardContent>
              <Typography>{countryDetails.attributes?.fiscal_year_start}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
