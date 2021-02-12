import * as requestFromServer from './countriesCrud'
import { countriesSlice, callTypes } from './countriesSlice'

const { actions } = countriesSlice

export const countrySort = (queryParams: any) => (dispatch: any) => {
  const { field, isAsc, entities } = queryParams
  console.log('field', field)
  dispatch(
    actions.countrySort({
      callType: callTypes.action,
      field,
      isAsc,
      entities,
    })
  )
}

export const fetchCountries = (params: any) => (dispatch: any) => {
  console.log('Called')
  dispatch(actions.startCall({ callType: callTypes.list }))
  return requestFromServer
    .findCountries(params)
    .then((response) => {
      const { pages, page, entities } = response.data
      dispatch(actions.countriesFetched({ pages, page, entities }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find countries"
      dispatch(actions.catchError({ error, callType: callTypes.list }))
    })
}

export const fetchAllCountry = () => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getAllCountries()
    .then((response) => {
      console.log(response)
      const { data } = response.data
      dispatch(actions.countriesFetched({ entities: data }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const fetchCountry = (id: any) => (dispatch: any) => {
  if (!id) {
    return dispatch(actions.countryFetched({ countryForEdit: undefined }))
  }

  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .getCountryById(id)
    .then((response) => {
      const country = response.data.data[0]
      console.log('country', country)
      dispatch(actions.countryFetched({ countryForEdit: country }))
    })
    .catch((error) => {
      error.clientMessage = "Can't find country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteCountry = (id: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteCountry(id)
    .then((response) => {
      dispatch(actions.countryDeleted({ id, response }))
    })
    .catch((error) => {
      error.clientMessage = "Can't delete country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const createCountry = (countryForCreation: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .createCountry(countryForCreation)
    .then((response) => {
      console.log(response.data)
      const countries = response.data.data
      dispatch(actions.countryCreated({ country: countries[0] }))
    })
    .catch((error) => {
      error.clientMessage = "Can't create country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const updateCountry = (country: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateCountry(country)
    .then(() => {
      dispatch(actions.countryUpdated({ country }))
    })
    .catch((error) => {
      error.clientMessage = "Can't update country"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const updateCountriesStatus = (ids: any, status: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .updateStatusForCountries({ ids, status })
    .then(() => {
      dispatch(actions.countriesStatusUpdated({ ids, status }))
    })
    .catch((error) => {
      error.clientMessage = "Can't update countries status"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}

export const deleteCountries = (ids: any) => (dispatch: any) => {
  dispatch(actions.startCall({ callType: callTypes.action }))
  return requestFromServer
    .deleteCountries(ids)
    .then(() => {
      dispatch(actions.countriesDeleted({ ids }))
    })
    .catch((error) => {
      error.clientMessage = "Can't delete countries"
      dispatch(actions.catchError({ error, callType: callTypes.action }))
    })
}
