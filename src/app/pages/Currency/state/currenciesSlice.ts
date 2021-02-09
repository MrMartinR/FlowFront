import { createSlice } from '@reduxjs/toolkit'

const initialCurrenciesState = {
  listLoading: true,
  actionsLoading: false,
  currenciesTable: {
    entities: null as any,
    success: false,
  },
  singleCurrency: {
    entry: null as any,
  },
  currencyForEdit: undefined,
  error: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const currenciesSlice = createSlice({
  name: 'currencies',

  initialState: initialCurrenciesState,
  reducers: {
    // when error occurs catch it
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    // set the state in which the process is in loading or setting the state
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    // update the currency state on all fetch
    currenciesFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.currenciesTable.entities = data.data
      state.currenciesTable.success = data.success
    },

    // update the currency state on fetch a single currency
    currencyFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.singleCurrency.entry = data.data
      state.currenciesTable.success = data.success
    },

    // on creation a new currency append it to existing currencies
    newCurrencyCreated: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.error = null
      state.currenciesTable.entities.unshift(data.data)
    },
  },
})
