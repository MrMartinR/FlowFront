import { createSlice } from '@reduxjs/toolkit';

let dateObject = new Date();

export const iconsSlice = createSlice({
    name: 'icons',
    initialState: {},
    reducers: {
        // catchError: (state, action) => {
        //   state.error = `${action.type}: ${action.payload.error}`;
        //   if (action.payload.callType === callTypes.list) {
        //     state.listLoading = false;
        //   } else {
        //     state.actionsLoading = false;
        //   }
        // },
        // startCall: (state, action) => {
        //   state.error = null;
        //   if (action.payload.callType === callTypes.list) {
        //     state.listLoading = true;
        //   } else {
        //     state.actionsLoading = true;
        //   }
        // },
        saveIcon: (state, action) => {
            const { uid, logo, icon } = action.payload;
            state[uid] = {
                logo,
                icon,
                createdAt: dateObject.getTime(),
            };
        },
        fetchIcon: (params) => (dispatch) => {},
    },
});

export const actions = iconsSlice.actions;
