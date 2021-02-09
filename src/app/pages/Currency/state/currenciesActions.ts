import * as requestFromServer from './currenciesCrud'
import { currenciesSlice, callTypes } from './currenciesSlice'

const { actions } = currenciesSlice

// GET all currencies in the table
export const getAllCurrencies = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .getAllCurrencies()
    .then((response) => {
      const { data } = response
      dispatch(actions.currenciesFetched({ data }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Currencies"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

// get a single currency
export const fetchCurrency = (id: any) => (dispatch: any) => {
  if (!id) {
    let error = "Can't find Currency without id"
    return dispatch(actions.catchError({ error, callType: callTypes.action }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getCurrencyById(id)
    .then((response) => {
      let currency = response.data
      dispatch(actions.currencyFetched({ currency }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Currency"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
