/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */

import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import * as _redux from "./redux"
import store, { persistor } from "./redux/store"
import App from "./app/App"
import "./index.scss" // Standard version
// Datepicker
import "react-datepicker/dist/react-datepicker.css"
import {
  MetronicLayoutProvider,
  MetronicSplashScreenProvider,
  MetronicSubheaderProvider,
} from "./_metronic/layout"
import { MetronicI18nProvider } from "./_metronic/i18n"
import "react-virtualized/styles.css"

/**
 * Base URL of the website.
 */
const { PUBLIC_URL } = process.env

/**
 * Inject metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
_redux.setupAxios(axios, store)

ReactDOM.render(
  // StrictMode is a tool for highlighting potential problems in an application in development.
  <React.StrictMode>
    <MetronicI18nProvider>
      <MetronicLayoutProvider>
        <MetronicSubheaderProvider>
          <MetronicSplashScreenProvider>
            <App store={store} persistor={persistor} basename={PUBLIC_URL} />
          </MetronicSplashScreenProvider>
        </MetronicSubheaderProvider>
      </MetronicLayoutProvider>
    </MetronicI18nProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
