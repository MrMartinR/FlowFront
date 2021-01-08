import React, { Suspense } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { LayoutSplashScreen, ContentRoute } from '../common/layout'
import DashboardPage from './pages/DashboardPage'
import SettingPage from './pages/SettingPage'
import { Contacts } from './pages/Contact'
import { AccountsPage } from './pages/Account/AccountsPage'
import { CountriesPage } from './pages/Country/CountriesPage'
import LendingPage from './pages/LendingPage.js'
import { CurrenciesPage } from './pages/Currency/CurrenciesPage'
import { PlatformsPage } from './pages/Platform/PlatformsPage'
import { UserAccountsPage } from './pages/UserAccount/UserAccount'

export default function basePage() {
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
        <ContentRoute path="/currencies" component={CurrenciesPage} />
        <Redirect to="error" />
      </Switch>
    </Suspense>
  )
}
