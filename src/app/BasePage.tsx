import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingPage } from "./pages/SettingPage";
import { ContactsPage } from "./pages/ContactsPage";
import { AccountsPage } from "./pages/Account/AccountsPage";
import { CountriesPage } from "./pages/Country/CountriesPage";
import { LendingPage } from "./pages/LendingPage";
import { PropertyPage } from "./pages/PropertyPage";
import { OriginatorsPage } from "./pages/OriginatorsPage";
import { CurrenciesPage } from "./pages/Currency/CurrenciesPage";
import { PlatformsPage } from "./pages/Platform/PlatformsPage";
import { UserAccountsPage } from "./pages/UserAccount/UserAccount";

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/contacts" component={ContactsPage} />
        <ContentRoute path="/settings" component={SettingPage} />
        <ContentRoute path="/accounts" component={AccountsPage} />
        <ContentRoute path="/user_accounts" component={UserAccountsPage} />
        <ContentRoute path="/countries" component={CountriesPage} />
        <ContentRoute path="/lending" component={LendingPage} />
        <ContentRoute path="/property" component={PropertyPage} />
        <ContentRoute path="/platforms" component={PlatformsPage} />
        <ContentRoute path="/originators" component={OriginatorsPage} />
        <ContentRoute path="/currencies" component={CurrenciesPage} />
        <Redirect to="error/error-v6" />
      </Switch>
    </Suspense>
  );
}