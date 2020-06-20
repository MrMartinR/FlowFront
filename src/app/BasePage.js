import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {DashboardPage} from "./pages/DashboardPage";
import {SettingPage} from "./pages/SettingPage";
import {AccountsPage} from "./pages/Account/AccountsPage";
import {CountriesPage} from "./pages/Country/CountriesPage";
import {LendingPage} from "./pages/LendingPage";
import {PropertyPage} from "./pages/PropertyPage";
import {PlatformsPage} from "./pages/PlatformsPage";
import {OriginatorsPage} from "./pages/OriginatorsPage";
import {CurrencyPage} from "./pages/Currency/CurrencyPage"

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);
const ReactBootstrapPage = lazy(() =>
  import("./modules/ReactBootstrapExamples/ReactBootstrapPage")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>
                <ContentRoute path="/setting" component={SettingPage}/>
                <ContentRoute path="/accounts" component={AccountsPage}/>
                <ContentRoute path="/countries" component={CountriesPage}/>
                <ContentRoute path="/lending" component={LendingPage}/>
                <ContentRoute path="/property" component={PropertyPage}/>
                <ContentRoute path="/platforms" component={PlatformsPage}/>
                <ContentRoute path="/originators" component={OriginatorsPage}/>                
                <ContentRoute path="/currency" component={CurrencyPage}/>                
                <Route path="/google-material" component={GoogleMaterialPage}/>
                <Route path="/react-bootstrap" component={ReactBootstrapPage}/>
                <Route path="/e-commerce" component={ECommercePage}/>
                <Redirect to="error/error-v6"/>
            </Switch>
        </Suspense>
    );
}
