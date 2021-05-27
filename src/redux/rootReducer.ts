import { combineReducers } from 'redux'

import { authSlice } from '../app/modules/Auth/state/authSlice'
import { accountsSlice } from '../app/pages/Account/state/accountsSlice'
import { contactsSlice } from '../app/pages/Contact/state/contactsSlice'
import { countriesSlice } from '../app/pages/Country/state/countriesSlice'
import { currenciesSlice } from '../app/pages/Currency/state/currenciesSlice'
import { loansSlice } from '../app/pages/Loan/state/loansSlice'
import { originatorsSlice } from '../app/pages/Originator/state/originatorsSlice'
import { platformsSlice } from '../app/pages/Platform/state/platformsSlice'
import { userAccountsSlice } from '../app/pages/UserAccount/state/userAccountsSlice'
import { userLoansSlice } from '../app/pages/UserLoan/state/userLoansSlice'
import { userOriginatorsSlice } from '../app/pages/UserOriginator/state/userOriginatorsSlice'
import { userPlatformsSlice } from '../app/pages/Lending/state/userPlatformsSlice'
import { userSettingsSlice } from '../app/pages/Contact/UserSettings/state/userSettingsSlice'

export const rootReducer = combineReducers({
  accounts: accountsSlice.reducer,
  auth: authSlice.reducer,
  contacts: contactsSlice.reducer,
  countries: countriesSlice.reducer,
  currencies: currenciesSlice.reducer,
  loans: loansSlice.reducer,
  originators: originatorsSlice.reducer,
  platforms: platformsSlice.reducer,
  userAccounts: userAccountsSlice.reducer,
  userLoans: userLoansSlice.reducer,
  userOriginators: userOriginatorsSlice.reducer,
  userPlatforms: userPlatformsSlice.reducer,
  userSettings: userSettingsSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>