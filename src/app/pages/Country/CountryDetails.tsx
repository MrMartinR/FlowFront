import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { CountryDetailsToolbar } from './CountryDetailsToolbar'
import * as countriesActions from './state/countriesActions'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
export const CountryDetails = (props: any) => {
  const { params } = props.match
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.countries,
    }),
    shallowEqual
  )
  const [countryDetails, setCountryDetails] = useState({} as any)
  const dispatch = useDispatch()
  // chamada a action para conseguir a informacion dun country
  useEffect(() => {
    if (dispatch) {
      dispatch(countriesActions.fetchCountry(params.id))
    }
  }, [dispatch, params])
  // Unha vez obten resposta colle os datos do state
  useEffect(() => {
    currentState.singleCountry && setCountryDetails(currentState.singleCountry)
  }, [currentState.singleCountry])
  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(countriesActions.resetSuccess())
  }
  return (
    <>
      <CountryDetailsToolbar name={countryDetails.attributes?.name} iso_code={countryDetails.attributes?.iso_code} />
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />

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
