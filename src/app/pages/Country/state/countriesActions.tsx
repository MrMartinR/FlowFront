import * as requestFromServer from './countriesCrud'
import { countriesSlice, callTypes } from './countriesSlice'

const { actions } = countriesSlice

/**
 * Fetch all countries
 */
export const fetchCountries = () => (dispatch: any) => {
    dispatch(actions.startCall({ callType: callTypes.list }))
    return requestFromServer
    .getAllCountries()
    .then((response) => {
        const { data } = response
        dispatch(actions.countriesFetched(data))
    })
    .catch((error) => {
        error.clientMessage = "Can't find Countries"
        dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}
/**
 * Fetch individual country
 * @param id
 */
export const fetchCountry = (id: any) => (dispatch: any) => {
    /**
     * If no pass id as parameter returns an error
     * @return error = "Can't find Country without id"
     * */
    if (!id) {
      let error = "Can't find Country without id"
      return dispatch(actions.catchError({ error, callType: callTypes.action }))
    }
  
    dispatch(actions.startCall({ callType: callTypes.action }))
    return requestFromServer
      .getCountryById(id)
      .then((response) => {
        const { data } = response
        dispatch(actions.countryFetched(data))
      })
      .catch((error) => {
        error.clientMessage = "Can't find Country"
        dispatch(actions.catchError({ error, callType: callTypes.action }))
      })
}
/**
 * Create a Country
 * @param data
 */
 export const createCountry = (data: any) => (dispatch: any) => {
    dispatch(actions.startCall({ callType: callTypes.action }))
    return requestFromServer
      .createCountry(data)
      .then((response) => {
        const { data } = response
        dispatch(actions.countryCreated(data))
      })
      .catch((error) => {
        error.clientMessage = "Can't create country"
        dispatch(actions.catchError({ error, callType: callTypes.action }))
      })
}
/**
 * Update a Country
 * @param data
 */
 export const updateCountry = (data: any, id: any) => (dispatch: any) => {
    dispatch(actions.startCall({ callType: callTypes.action }))
    return requestFromServer
      .updateCountry(data, id)
      .then((response) => {
        const { data } = response
        dispatch(actions.countryUpdated(data))
      })
      .catch((error) => {
        error.clientMessage = "Can't update country"
        dispatch(actions.catchError({ error, callType: callTypes.action }))
      })
  }
  /*
   * delete a country
   * id: this will be country is
   * deleteCountry to trigger the promise
   */
  export const deleteCountry = (id: any) => (dispatch: any) => {
    dispatch(actions.startCall({ callType: callTypes.list }))
    return requestFromServer
      .deleteCountry(id)
      .then((response) => {
        const { data } = response
        const returnedTarget = {...data, itm:id}
        dispatch(actions.countryDeleted(returnedTarget))
      })
      .catch((error) => {
        error.clientMessage = "Can't find country"
        dispatch(actions.catchError({ error, callType: callTypes.list }))
      })
  }
  export const resetSuccessCountry = () => (dispatch: any) => {
    dispatch( actions.countryResetSuccess({ success: null }));
  }