import { createSlice } from "@reduxjs/toolkit"

const initialPlatformsState = {
  listLoading: true,
  actionsLoading: false, // for filtering
  platformTable: null,
  lastError: null,
  filteredTable: null,
}
export const callTypes = {
  list: "list",
  action: "action",
}

export const platformsSlice = createSlice({
  name: "platforms",
  initialState: initialPlatformsState,
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
    platformsFetched: (state, action) => {
      const { data } = action.payload
      // console.log("new Data");
      // console.log(data);
      state.listLoading = false
      state.actionsLoading = false
      state.error = null
      state.platformTable = data
      state.filteredTable = data
    },
    filterData: (state, action) => {
      const data = action.payload
      const filteredData = []
      for (let i = 0; i < state.platformTable.length; i++) {
        let shouldAdd = true
        if (
          data.statusList &&
          data.statusList.length > 0 &&
          !data.statusList.includes(state.platformTable[i].status)
        ) {
          shouldAdd = false
          continue
        }
        if (
          data.catList &&
          data.catList.length > 0 &&
          state.platformTable[i].category &&
          state.platformTable[i].category > 0
        ) {
          const results = state.platformTable[i].category.some((value) =>
            data.catList.includes(value)
          )
          if (!results) {
            shouldAdd = false
            continue
          }
        }
        if (data.protList && data.protList.length > 0) {
          if (
            state.platformTable[i].protection_scheme &&
            state.platformTable[i].protection_scheme.length > 0
          ) {
            const results = state.platformTable[
              i
            ].protection_scheme.some((value) => data.protList.includes(value))
            if (!results) {
              shouldAdd = false
              continue
            }
          } else {
            shouldAdd = false
            continue
          }
        }

        if (data.secMarketYes || data.secMarketNo) {
          if (data.secMarketYes && data.secMarketNo) {
            // do nothing
          } else if (
            data.secMarketYes &&
            state.platformTable[i].secondary_market !== "Yes"
          ) {
            shouldAdd = false
            continue
          } else if (
            data.secMarketNo &&
            state.platformTable[i].secondary_market !== "No"
          ) {
            shouldAdd = false
            continue
          }
        }

        if (shouldAdd) {
          filteredData.push(state.platformTable[i])
        }
      }
      // console.log(filteredData);
      state.actionsLoading = false
      state.error = null
      state.filteredTable = filteredData
    },
  },
})
