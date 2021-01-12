import React, {Suspense} from 'react'
import {Redirect, Switch} from 'react-router-dom'
import {LayoutSplashScreen, ContentRoute} from '../common/layout'
import DashboardPage from './pages/Dashboard'
import SettingPage from './pages/Contact/ContactSettings'
import {Contacts} from './pages/Contact'
import {AccountsPage} from './pages/Account/AccountsPage'
import {UserAccountsPage} from './pages/UserAccount'
import {CountriesPage} from './pages/Country/CountriesPage'
import {LendingPage} from './pages/LendingPage'
import {CurrenciesPage} from './pages/Currency/CurrenciesPage'
// import {PlatformsPage} from './pages/Platform'
import PlatformsPage from './pages/Platform/PlatformsList'
import {OriginatorsPage} from './pages/Originator'
import {LoansPage} from './pages/Loan'

// import { styles } from '@material-ui/core'





export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/contacts" component={Contacts} />
        <ContentRoute path="/settings" component={SettingPage} />
        <ContentRoute path="/accounts" component={AccountsPage} />
        <ContentRoute path="/user_accounts" component={UserAccountsPage} />
        <ContentRoute path="/countries" component={CountriesPage} />
        <ContentRoute path="/lending" component={LendingPage} />
        <ContentRoute path="/platforms" component={PlatformsPage} />
        <ContentRoute path="/originators" component={OriginatorsPage} />
        <ContentRoute path="/loans" component={LoansPage} />
        <ContentRoute path="/currencies" component={CurrenciesPage} />
        <Redirect to="error" />
      </Switch>
    </Suspense>
  )
}
