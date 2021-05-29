import { Route, Redirect, Switch } from 'react-router-dom'
import { Accounts } from './pages/Account'
import { Contacts } from './pages/Contact'
import { CountryDetails } from './pages/Country/CountryDetails'
import { CountriesPage } from './pages/Country'
import { Currencies } from './pages/Currency'
import { CurrencyDetails } from './pages/Currency/CurrencyDetails'
import DashboardPage from './pages/Dashboard'
import { LendingPage } from './pages/Lending'
import { LoanDetailsPage } from './pages/Loan/LoanDetails'
import { LoansPage } from './pages/Loan'
import { OriginatorsPage } from './pages/Originator'
import { OriginatorDetailsPage } from './pages/Originator/OriginatorDetailsPage'
import { PlatformsPage } from './pages/Platform'
import { PlatformDetailsPage } from './pages/Platform/PlatformDetailsPage'
import { UserSettings } from './pages/Contact/UserSettings/UserSettings'
import { UserAccountsPage } from './pages/UserAccount'
import { UserLoansPage } from './pages/UserLoan'
import { UserOriginatorsPage } from './pages/UserOriginator'
import { UserPlatformsPage } from './pages/Lending/UserPlatform'
import { UserPlatformsOverallPage } from './pages/Lending/UserPlatformOverall'
import { ErrorPage } from './modules/Errors/ErrorPage'

export const BasePage = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path={'/contacts/:id'} component={Contacts} />
      <Route path="/contacts" component={Contacts} />
      <Route path={'/countries/:id'} component={CountryDetails} />
      <Route path="/countries" component={CountriesPage} />
      <Route path="/accounts" component={Accounts} />
      <Route path="/settings" component={UserSettings} />
      <Route path="/user_accounts" component={UserAccountsPage} />
      <Route path="/lending" component={LendingPage} />
      <Route path={`/originators/:id`} component={OriginatorDetailsPage} />
      <Route path="/originators" component={OriginatorsPage} />
      <Route path={`/platforms/:id`} component={PlatformDetailsPage} />
      <Route path="/platforms" component={PlatformsPage} />
      <Route path="/user-loans" component={UserLoansPage} />
      <Route path={`/loans/:id`} component={LoanDetailsPage} />
      <Route path="/loans" component={LoansPage} />
      <Route path={'/currencies/:id'} component={CurrencyDetails} />
      <Route path="/currencies" component={Currencies} />
      <Route path="/user-platform" component={UserPlatformsPage} />
      <Route path="/user-platform-overall" component={UserPlatformsOverallPage} />
      <Route path="/user-originators" component={UserOriginatorsPage} />
      <Route path="/error/error" component={ErrorPage} />
      <Redirect to="/error/error" />
    </Switch>
  )
}
