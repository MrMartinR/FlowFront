/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from 'react'
import { Switch } from 'react-router-dom'
import { shallowEqual, useSelector } from 'react-redux'
import { Layout } from '../common/layout'
import { BasePage } from './BasePage'
import { AuthPage } from './AuthPage'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { RootState } from '../redux/rootReducer'

export const Routes = () => {
  const { currentState } = useSelector(
    (state: RootState) => ({
      currentState: state.auth,
    }),
    shallowEqual
  )
  const isAuthorized= (currentState.user !== null && currentState.user !== undefined);
  
  return (
    <Switch>
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