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
      dispatch(actions.currenciesFetched(data))
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
      const { data } = response
      dispatch(actions.currencyFetched(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't find Currency"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

/**
 * Create a Currency
 * @param data
 */
 export const createCurrency = (data: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createCurrency(data)
    .then((response) => {
      const { data } = response
      dispatch(actions.currencyCreated(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't create country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/**
* Update a Currency
* @param data
*/
export const updateCurrency = (data: any, id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateCurrency(data, id)
    .then((response) => {
      const { data } = response
      dispatch(actions.currencyUpdated(data))
    })
    .catch((error) => {
      error.clientMessage = "Can't update country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
/*
 * delete a currency
 * id: this will be currency is
 * deleteCurrency to trigger the promise
 */
export const deleteCurrency = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .deleteCurrency(id)
    .then((response) => {
      const { data } = response
      const returnedTarget = {...data, itm:id}
      dispatch(actions.currencyDeleted(returnedTarget))
    })
    .catch((error) => {
      error.clientMessage = "Can't find country"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
export const resetSuccess = () => (dispatch: any) => {
  dispatch( actions.resetSuccess({ success: null }));
}
