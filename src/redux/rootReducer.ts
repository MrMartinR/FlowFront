import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../app/modules/Auth/_redux/authRedux'
import { accountsSlice } from '../app/pages/Account/state/accountsSlice'
import { contactsSlice } from '../app/pages/Contact/state/contactsSlice'
import { contactMethodsSlice } from '../app/pages/Contact/ContactMethods/state/contactMethodsSlice'
import { countriesSlice } from '../app/pages/Country/state/countriesSlice'
import { currenciesSlice } from '../app/pages/Currency/state/currenciesSlice'
import { loansSlice } from '../app/pages/Loan/state/loansSlice'
import { originatorsSlice } from '../app/pages/Originator/state/originatorsSlice'
import { platformsSlice } from '../app/pages/Platform/state/platformsSlice'
import { userAccountsSlice } from '../app/pages/UserAccount/state/userAccountsSlice'
import { userLoansSlice } from '../app/pages/UserLoan/state/userLoansSlice'
import { userPlatformsSlice } from '../app/pages/Lending/state/userPlatformsSlice'

export const rootReducer = combineReducers({
  accounts: accountsSlice.reducer,
  auth: auth.reducer,
  contacts: contactsSlice.reducer,
  contactMethods: contactMethodsSlice.reducer,
  countries: countriesSlice.reducer,
  currencies: currenciesSlice.reducer,
  loans: loansSlice.reducer,
  originators: originatorsSlice.reducer,
  platforms: platformsSlice.reducer,
  userAccounts: userAccountsSlice.reducer,
  userLoans: userLoansSlice.reducer,
  userPlatforms: userPlatformsSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([auth.saga()])
}
