/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from '../common/layout'
import BasePage from './BasePage'
import { Logout, AuthPage } from './modules/Auth/index'
import ErrorsPage from './modules/Errors/ErrorsPage'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

export function Routes() {
  const { isAuthorized } = useSelector(
    // TODO: added type Any on refactor
    ({ auth }: any) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  )
 

  
  return (
    <Switch>
      <Route exact path="/error/error" component={ErrorsPage} />
      <Route exact path="/logout" component={Logout} />
      
      <PublicRoute 
        isAuth = { isAuthorized }
        path='/auth' 
        component={AuthPage} />  
      <Layout>
        <PrivateRoute 
          isAuth = { isAuthorized }
          path='/' 
          component={ BasePage } />
      </Layout>
      
    </Switch>
  )
}

export default Routes
// {!isAuthorized ? (
//   /* Render auth page when user at `/auth` and not authorized. */
//   <Route>
//     <AuthPage />
//   </Route>
// ) : (
//   /* Otherwise redirect to root page (`/`) */
//   <Redirect from="/auth" to="/" />
// )}

// <Route path="/error" component={ErrorsPage} />
// <Route path="/logout" component={Logout} />

// {!isAuthorized ? (
//   /* Redirect to `/auth` when user is not authorized */
//   <Redirect to="/auth/login" />
// ) : (
//   <Layout>
//     <BasePage />
//   </Layout>
// )}