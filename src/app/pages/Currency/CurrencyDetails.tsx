import { Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/rootReducer'
import { UserAlert } from '../../utils/UserAlert'
import { CurrencyDetailsToolbar } from './CurrencyDetailsToolbar'
import * as currenciesActions from './state/currenciesActions'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'

export const CurrencyDetails = (props: any) => {
  const { params } = props.match
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.currencies,
    }),
    shallowEqual
  )
  const [currencyDetails, setCurrencyDetails] = useState({} as any)
  const dispatch = useDispatch()
  // chamada a action para conseguir a informacion dun currency
  useEffect(() => {
    dispatch(currenciesActions.fetchCurrency(params.id))
  }, [dispatch, params])
  // Unha vez obten resposta colle os datos do state
  useEffect(() => {
    currentState.singleCurrency && setCurrencyDetails(currentState.singleCurrency)
  }, [currentState.singleCurrency])
  // resetea o state para que se oculte o snackbar
  const resetSuccess = () => {
    dispatch(currenciesActions.resetSuccess())
  }
  return (
    <>
      <CurrencyDetailsToolbar name={currencyDetails.attributes?.name} symbol={currencyDetails.attributes?.symbol} />
      <UserAlert
        resetSuccess={resetSuccess}
        success={currentState.success}
        message={currentState.message}
        error={currentState.error}
      />
      <Grid container direction="row" justify="space-between">
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Code"></CardHeader>
            <CardContent>
              <Typography>{currencyDetails.attributes?.code}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="Type"></CardHeader>
            <CardContent>
              <Typography>{currencyDetails.attributes?.kind}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardHeader title="FX EUR"></CardHeader>
            <CardContent>
              <Typography>{currencyDetails.attributes?.fx_eur}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Card>
          <CardHeader title="Decimals"></CardHeader>
          <CardContent>
            <Typography>{currencyDetails.attributes?.decimal_places}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
