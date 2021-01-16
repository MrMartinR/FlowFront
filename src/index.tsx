/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import * as _redux from './redux'
import store, {persistor} from './redux/store'
import App from './app/App'
import {LayoutProvider, SplashScreenProvider} from './common/layout'
// import 'react-virtualized/styles.css'

/**
 * Base URL of the website.
 */
const {PUBLIC_URL} = process.env

/**
 * Inject metronic interceptors for axios.
 *
 * See {@link https://github.com/axios/axios#interceptors}
 */
_redux.setupAxios(axios, store)

ReactDOM.render(
  /** StrictMode is a tool for highlighting potential problems in an application in development. */
  <React.StrictMode>
    <LayoutProvider>
      <SplashScreenProvider>
        <App store={store} persistor={persistor} basename={PUBLIC_URL} />
      </SplashScreenProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
