/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { ContentRoute } from '../../../../common/layout'
import Login from './Login'
import Registration from './Registration'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordAction from './ForgotPasswordAction'

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/* begin::Login */}
        <div
          className="login login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/* begin::Content */}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            {/* add component login and registration */}
            <div className="d-flex flex-column-fluid flex-center mt-md-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                <ContentRoute
                  path="/auth/registration"
                  component={Registration}
                />
                <ContentRoute
                  path="/auth/forgot-password"
                  component={ForgotPassword}
                />
                <ContentRoute
                  path="/auth/forgot-password-actions"
                  component={ForgotPasswordAction}
                />
                <Redirect from="/auth" exact to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/* end::Content body */}
          </div>
          {/* end::Content */}
        </div>
        {/* end::Login */}
      </div>
    </>
  )
}

export default AuthPage
