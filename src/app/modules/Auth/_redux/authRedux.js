import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
// import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API"
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  client: undefined,
  expiry: undefined,
  token: undefined
};

export const reducer = persistReducer(
  { storage, key: "demo1-auth", whitelist: ["user", "authToken", "client", "expiry", "token"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        let authToken = action.payload.authToken;
        let uid = action.payload.uid;
        let client = action.payload.client;
        let expiry = action.payload.expiry;
        let token = action.payload.token;

        return { authToken, user: { email: uid, fullname: uid }, client, expiry, token };
      }

      case actionTypes.Register: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken, uid, client, expiry, token) => ({ type: actionTypes.Login, payload: { authToken, uid, client, expiry, token } }),
  register: authToken => ({
    type: actionTypes.Register,
    payload: { authToken }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: user => ({ type: actionTypes.UserRequested, payload: { user } }),
  fulfillUser: user => ({ type: actionTypes.UserLoaded, payload: { user } })
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    //const { data: user } = yield getUserByToken();

    //yield put(actions.fulfillUser(user));
  });
}
