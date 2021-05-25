import { Route, Switch, Redirect } from 'react-router-dom'
import { Login } from './modules/Auth/pages/Login'
import { ForgotPassword } from './modules/Auth/pages/ForgotPassword'
import { ForgotPasswordAction } from './modules/Auth/pages/ForgotPasswordAction'
import { Registration } from './modules/Auth/pages/Registration'

export const AuthPage = () => {
  return (
    <>
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/registration" component={Registration} />
        <Route path="/auth/forgot-password" component={ForgotPassword} />
        <Route path="/auth/forgot-password-actions" component={ForgotPasswordAction} />
        <Redirect from="/auth" exact to="/auth/login" />
        <Redirect to="/auth/login" />
      </Switch>      
    </>
  )
}
