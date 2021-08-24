import { createSlice } from '@reduxjs/toolkit'

const initialUserAccountsState = {
  listLoading: false,
  actionsLoading: false,
  userAccountsTable: null as any,
  userAccountsDetails: null as any,
  userAccountsTransactions: null as any,
  userAccountsTransactionDetails: null,
  error: null as any,
  success: null as any,
  message: null as any,
}
export const callTypes = {
  list: 'list',
  action: 'action',
}
export const userAccountsSlice = createSlice({
  name: 'user-accounts',
  initialState: initialUserAccountsState,
  reducers: {
    startCall: (state, action) => {
      state.success = null
      state.error = null
      state.message = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },
    userAccountsReceived: (state, action) => {
      const { data } = action.payload
      state.userAccountsTable = data
      state.listLoading = false
    },
    userAccountReceived: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.userAccountsDetails = data
    },

    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      state.success = false
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    userAccountTransactions: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.userAccountsTransactions = data
    },
    userAccountTransaction: (state, action) => {
      const { data } = action.payload
      state.actionsLoading = false
      state.userAccountsTransactionDetails = data
    },
    resetSuccess: (state, action) => {
      const { success } = action.payload
      state.success = success;
      state.message = null;
    },
    transactionCreate: (state, action) => {
      const { data } = action.payload
      state.actionsLoading=false
      const newState = state.userAccountsTransactions
      newState.unshift(data)
      state.userAccountsTransactions = newState
      state.success = true
    },
    transactionUpdate: (state, action) => {
      const { data } = action.payload
      // crease unha nova lista sustituindo a transaction a editar
      const newState = [] as any
      state.userAccountsTransactions.map((o: any) => {
        if (o.id !== data.id) {
          newState.push(o)
        } else newState.push(data)
        return newState;
      })
      // actualizase o state
      state.actionsLoading = false
      state.userAccountsTransactions = newState
      state.success = true
    },
    transactionDelete: (state, action) => {
      const { itm, success, message } = action.payload
      let newState = [] as any
      state.userAccountsTransactions.map((o: any) => {
        if (o.id !== itm) {
          newState.push(o)
        }
        return newState;
      })
      state.userAccountsTransactions = newState
      state.success = success
      state.message = message
      state.actionsLoading = false
    },
    userAccountUpdate: (state, action) => {
      //const { data } = action.payload
      // crease unha nova lista sustituindo a user_account a editar
      /* const newState = [] as any
      state.userAccountsTable.map((o: any) => {
        if (o.id !== data.id) {
          newState.push(o)
        } else newState.push(data)
        return newState;
      }) */
      // actualizase o state
      state.actionsLoading = false
      //state.userAccountsTable = newState
      state.success = true
    },
    userAccountDelete: (state, action) => {
      const { itm, success, message } = action.payload
      let newState = [] as any
      state.userAccountsTable.map((o: any) => {
        if (o.id !== itm) {
          newState.push(o)
        }
        return newState;
      })
      state.listLoading = false
      state.userAccountsTable = newState
      state.success = success
      state.message = message
    },
    userAccountCreate: (state, action) => {
      const { data } = action.payload
      state.listLoading=false
      const newState = state.userAccountsTable
      newState.unshift(data)
      // ordease a lista
      const result = sort(newState)
      state.success = true
      state.userAccountsTable = result
    }
  },
})

const sort = (list: any) => {
  // array temporal para ordear alfabeticamente
  const mapped = list.map((el: any, i: any) => {
    return { index: i, value: el.attributes.name.toLowerCase() };
  })
  // ordeando o array mapeado
  mapped.sort((a: any, b: any) => {
    if (a.value > b.value) {
      return 1
    }
    if (a.value < b.value) {
      return -1
    }
    return 0
  })
  // contenedor para o array ordeado
  const result = mapped.map((el:any) => {
    return list[el.index];
  })
  // devolvese o array ordeado
  return result
}