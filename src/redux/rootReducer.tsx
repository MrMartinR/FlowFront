import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../app/modules/Auth/_redux/authRedux'
import { userAccountsSlice } from './userAccounts/userAccountsSlice'
import { contactsSlice } from '../app/pages/Contact/state/contactsSlice'
import { accountsSlice } from './accounts/accountsSlice'
import { countriesSlice } from './countries/countriesSlice'
import { currenciesSlice } from './currencies/currenciesSlice'
import platforms  from './platforms/platforms'
import { iconsSlice } from './icons/iconsSlice'
import { contactMethodsSlice } from '../app/pages/Contact/ContactMethods/state/contactMethodsSlice'

export const rootReducer = combineReducers({
  userAccounts: userAccountsSlice.reducer,
  contacts: contactsSlice.reducer,
  contactMethods: contactMethodsSlice.reducer,
  accounts: accountsSlice.reducer,
  auth: auth.reducer,
  countries: countriesSlice.reducer,
  currencies: currenciesSlice.reducer,
  platforms: platforms,
  icons: iconsSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
