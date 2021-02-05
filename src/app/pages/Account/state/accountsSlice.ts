import { createSlice } from '@reduxjs/toolkit'

const initialAccountsState = {
  listLoading: true,
  actionsLoading: false,
  accountsTable: {
    entities: null as any,
    success: false,
  },
  singleAccount: {
    entry: null as any,
  },
  accountForEdit: undefined,
  error: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const accountsSlice = createSlice({
  name: 'accounts',

  initialState: initialAccountsState,
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

    // update the account state on all fetch
    accountsFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.accountsTable.entities = data.data
      state.accountsTable.success = data.success
    },

    // update the contact state on fetch a single contact
    accountFetched: (state, action) => {
      const { data } = action.payload
      state.listLoading = false
      state.error = null
      state.singleAccount.entry = data.data
      state.accountsTable.success = data.success
    },

       // createAccount
       accountCreated: (state, action) => {
        state.actionsLoading = false
        state.error = null
        state.accountsTable.entities.push(action.payload.account)
      },

         // updateAccount
    accountUpdated: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountsTable.entities = state.accountsTable.entities.map((entity: any) => {
        if (entity.id === action.payload.account.id) {
          return action.payload.account
        }
        return entity
      })
    },



    // deleteAccount
    accountDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountsTable.entities = state.accountsTable.entities.filter((el: any) => el.id !== action.payload.id)
    },
    // deleteAccount
    accountsDeleted: (state, action) => {
      state.error = null
      state.actionsLoading = false
      state.accountsTable.entities = state.accountsTable.entities.filter((el: any) => !action.payload.ids.includes(el.id))
    },
    // accountsUpdateState
    accountsStatusUpdated: (state, action) => {
      state.actionsLoading = false
      state.error = null
      const { ids, status } = action.payload
      state.accountsTable.entities = state.accountsTable.entities.map((entity: any) => {
        if (ids.findIndex((id: any) => id === entity.id) > -1) {
          entity.status = status
        }
        return entity
      })
    },
  },
})

    // on creation a new contact append it to existing contacts
    // newContactCreated: (state, action) => {
    //   const { data } = action.payload
    //   state.actionsLoading = false
    //   state.error = null
    //   state.accountsTable.entities.unshift(data.data)
    // },
  
