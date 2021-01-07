import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'

export default function ErrorsPage() {
  return (
    <Switch>
      <Redirect from="/error" exact to="/error/error" />
      <Route path="/error/error" component={ErrorPage} />
    </Switch>
  )
}
