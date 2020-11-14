/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {Link, Switch, Redirect} from "react-router-dom";
import {toAbsoluteUrl} from "../../../../_metronic/_helpers";
import {ContentRoute} from "../../../../_metronic/layout"
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordAction from "./ForgotPasswordAction";
import "../../../../_metronic/_assets/sass/pages/login/login-3.scss";

export function AuthPage() {
  return (
      <>
        <div className="d-flex flex-column flex-root">
          {/*begin::Login*/}
          <div
              className="login login-3 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
              id="kt_login"
          >
            {/*begin::Aside*/}
            <div
                className="login-aside flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10 d-none"
                style={{
                  backgroundImage: `url(${toAbsoluteUrl("/media/bg/bg-4.jpg")})`
                }}
            >
              {/*begin: Aside Container*/}
              <div className="d-flex flex-row-fluid flex-column justify-content-between">
                {/* start:: Aside header */}
                <Link to="/" className="flex-column-auto mt-5">
                  <img
                      alt="Logo"
                      className="max-h-70px max-w-70px"
                      src={toAbsoluteUrl("/media/logos/flow-logo.svg")}
                  />
                </Link>
                {/* end:: Aside header */}

                {/* start:: Aside content */}
                <div className="flex-column-fluid d-flex flex-column justify-content-center">
                  <h3 className="font-size-h1 mb-5 text-white mt-1">
                    Welcome to Flow
                  </h3>
                  {/* <p className="font-weight-lighter text-white opacity-80">
                    The ultimate Bootstrap & React 16 admin theme framework for next
                    generation web apps.
                  </p> */}
                </div>
                {/* end:: Aside content */}

                {/* start:: Aside footer for desktop */}
                {/* <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                  <div className="opacity-70 font-weight-bold	text-white">
                    &copy; 2020 Flow App
                  </div>
                  <div className="d-flex">
                    <Link to="/terms" className="text-white">
                      Privacy
                    </Link>
                    <Link to="/terms" className="text-white ml-10">
                      Legal
                    </Link>
                    <Link to="/terms" className="text-white ml-10">
                      Contact
                    </Link>
                  </div>
                </div> */}
                {/* end:: Aside footer for desktop */}
              </div>
              {/*end: Aside Container*/}
            </div>
            {/*begin::Aside*/}

            {/*begin::Content*/}
            <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">

              {/* begin::Content body */}
                {/*add component login and registration */}
              <div className="d-flex flex-column-fluid flex-center mt-md-30 mt-lg-0">
                <Switch>
               <ContentRoute path="/auth/login" component={Login}/>
                <ContentRoute path="/auth/registration" component={Registration}/>
                <ContentRoute
                    path="/auth/forgot-password"
                    component={ForgotPassword}
                />
                 <ContentRoute
                    path="/auth/forgot-password-actions"
                    component={ForgotPasswordAction}
                />
                <Redirect from="/auth" exact={true} to="/auth/login"/>
                <Redirect to="/auth/login"/>
              </Switch>
              </div>
              {/*end::Content body*/}

              {/* begin::Mobile footer */}
              {/* <div
                  className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
                <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                  &copy; 2020 Flow app
                </div>
                <div className="d-flex order-1 order-sm-2 my-2">
                  <Link to="/terms" className="text-dark-75 text-hover-primary">
                    Privacy
                  </Link>
                  <Link
                      to="/terms"
                      className="text-dark-75 text-hover-primary ml-4"
                  >
                    Legal
                  </Link>
                  <Link
                      to="/terms"
                      className="text-dark-75 text-hover-primary ml-4"
                  >
                    Contact
                  </Link>
                </div>
              </div> */}
              {/* end::Mobile footer */}
            </div>
            {/*end::Content*/}
          </div>
          {/*end::Login*/}
        </div>
      </>
  );
}
