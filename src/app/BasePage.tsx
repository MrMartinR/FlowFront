import React, {Suspense} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import {LayoutSplashScreen} from '../common/layout'
import DashboardPage from './pages/Dashboard'
import SettingPage from './pages/Contact/contactSettings'
import {Contacts} from './pages/Contact'
import {UserAccountsPage} from './pages/UserAccount'
import {LendingPage} from './pages/LendingPage'
import {CurrenciesPage} from './pages/Currency/CurrenciesPage'
import PlatformsPage from './pages/Platform'
import PlatformDetailsPage from './pages/Platform/PlatformDetailsPage'
import OriginatorsPage from './pages/Originator'
import LoansPage from './pages/Loan'

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <Redirect exact from='/' to='/dashboard' />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/contacts' component={Contacts} />
        <Route path='/settings' component={SettingPage} />
        <Route path='/user_accounts' component={UserAccountsPage} />
        <Route path='/lending' component={LendingPage} />
        <Route path={`/platforms/:id`} component={PlatformDetailsPage} />
        <Route path='/platforms' component={PlatformsPage} />
        <Route path='/originators' component={OriginatorsPage} />
        <Route path='/loans' component={LoansPage} />
        <Route path='/currencies' component={CurrenciesPage} />
        <Redirect to='error' />
      </Switch>
    </Suspense>
  )
}
