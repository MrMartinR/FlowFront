import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { userAccountsSlice } from "./userAccounts/userAccountsSlice";
import { accountsSlice } from "./accounts/accountsSlice";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { countriesSlice } from "./countries/countriesSlice";
import { currenciesSlice } from "./currencies/currenciesSlice";
import { platformsSlice } from "./platforms/platformsSlice";
import { iconsSlice } from "./icons/iconsSlice";

export const rootReducer = combineReducers({
  userAccounts: userAccountsSlice.reducer,
  accounts: accountsSlice.reducer,
  auth: auth.reducer,
  customers: customersSlice.reducer,
  countries: countriesSlice.reducer,
  currencies: currenciesSlice.reducer, 
  products: productsSlice.reducer,
  remarks: remarksSlice.reducer,
  specifications: specificationsSlice.reducer,
  platforms: platformsSlice.reducer,
  icons: iconsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
