import React, { Suspense } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { LayoutSplashScreen } from '../common/layout'
import DashboardPage from './pages/Dashboard'
import SettingPage from './pages/Contact/UserSettings/UserSettings'
import { Contacts } from './pages/Contact'
import Countries from './pages/Country'
import { Accounts } from './pages/Account'
import { UserAccountsPage } from './pages/UserAccount'
import { LendingPage } from './pages/Lending'
import { Currencies } from './pages/Currency'
import { PlatformsPage } from './pages/Platform'
import { PlatformDetailsPage } from './pages/Platform/PlatformDetailsPage'
import { OriginatorsPage } from './pages/Originator'
import { OriginatorDetailsPage } from './pages/Originator/OriginatorDetailsPage'
import UserLoansPage from './pages/UserLoan'
import LoansPage from './pages/Loan'
import LoanDetailsPage from './pages/Loan/LoanDetails'
import UserPlatformsPage from './pages/Lending/UserPlatform'
import UserPlatformsOverallPage from './pages/Lending/UserPlatformOverall'

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/dashboard" component={DashboardPage} />
        <Route path={"/contacts/:id"} component={Contacts} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/countries" component={Countries} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/settings" component={SettingPage} />
        <Route path="/user_accounts" component={UserAccountsPage} />
        <Route path="/lending" component={LendingPage} />
        <Route path={`/originators/:id`} component={OriginatorDetailsPage} />
        <Route path="/originators" component={OriginatorsPage} />
        <Route path={`/platforms/:id`} component={PlatformDetailsPage} />
        <Route path="/platforms" component={PlatformsPage} />
        <Route path="/user-loans" component={UserLoansPage} />
        <Route path={`/loans/:id`} component={LoanDetailsPage} />
        <Route path="/loans" component={LoansPage} />
        <Route path="/currencies" component={Currencies} />
        <Route path="/user-platform" component={UserPlatformsPage} />
        <Route path="/user-platform-overall" component={UserPlatformsOverallPage} />
        <Redirect to="error" />
      </Switch>
    </Suspense>
  )
}
