import { createSlice } from "@reduxjs/toolkit"
import Util from "../../app/utils"

const initialCountriesState = {
  listLoading: false,
  actionsLoading: false,
  countryTable: { entities: null, page: null, pages: null, perPage: null },
  countryForEdit: undefined,
  lastError: null,
}
export const callTypes = {
  list: "list",
  action: "action",
}

export const countriesSlice = createSlice({
  name: "countries",
  initialState: initialCountriesState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    countrySort: (state, action) => {
      const { field, isAsc, entities } = action.payload
      const areEmptyFields = entities.some((i) => i[field])
      if (areEmptyFields) {
        const entitiesOrdened = [...entities].sort(
          Util.sortCustom(field, isAsc, (a) => a.toUpperCase())
        )
        state.countryTable.entities = entitiesOrdened
      }
    },
    // getCustomerById
    countryFetched: (state, action) => {
      console.log("ACTION: ", action)
      state.actionsLoading = false
      state.countryForEdit = action.payload.countryForEdit
      state.error = null
    },
    // findCustomers
    countriesFetched: (state, action) => {
      const { entities } = action.payload
      state.listLoading = false
      state.error = null
      state.countryTable.entities = entities
    },
    // createCustomer
    countryCreated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      state.countryTable.entities.push(action.payload.country)
    },
    // updateCustomer
    countryUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.map(
        (entity) => {
          if (entity.id === action.payload.country.id) {
            return action.payload.country
          }
          return entity
        }
      )
    },
    // deleteCustomer
    countryDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    // deleteCustomers
    countriesDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.countryTable.entities = state.countryTable.entities.filter(
        (el) => !action.payload.ids.includes(el.id)
      )
    },
    // CountriesUpdateState
    countriesStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.countryTable.entities = state.countryTable.entities.map(
        (entity) => {
          if (ids.findIndex((id) => id === entity.id) > -1) {
            entity.status = status
          }
          return entity
        }
      )
    },
  },
})
