import {createSlice} from "@reduxjs/toolkit";

const initialCustomersState = {
  listLoading: false,
  actionsLoading: false,
  total_pages: 0,
  data: null,
  accountForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: initialCustomersState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getCustomerById
    accountFetched: (state, action) => {
      state.actionsLoading = false;
      state.accountForEdit = action.payload.accountForEdit;
      state.error = null;
    },
    // findCustomers
    accountsFetched: (state, action) => {
      const { totalCount, data } = action.payload;
      console.log('action.payload', action.payload)
      state.listLoading = false;
      state.error = null;
      state.data = data;
      state.totalCount = totalCount;
    },
    // createCustomer
    accountCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.data.push(action.payload.account);
    },
    // updateCustomer
    accountUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.data = state.data.map(entity => {
        if (entity.id === action.payload.account.id) {
          return action.payload.account;
        }
        return entity;
      });
    },
    // deleteCustomer
    accountDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.data = state.data.filter(el => el.id !== action.payload.id);
    },
    // deleteCustomers
    accountsDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.data = state.data.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // accountsUpdateState
    accountsStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.data = state.data.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
