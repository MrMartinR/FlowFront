/* eslint-disable no-shadow */
import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { LayoutSplashScreen } from "../../../../common/layout"
import * as auth from "../_redux/authRedux"

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props
    logout()
  }

  render() {
    const { hasAuthToken } = this.props
    return hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />
  }
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout)
