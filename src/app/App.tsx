/**
 * Entry application component used to compose providers and render Routes.
 * */

import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Routes } from './Routes'
import { LayoutSplashScreen } from '../common/layout'
import { FlowThemeProvider } from '../common/style/ThemeProvider'
// @rev: Added type any to funtion app
export default function App({ store, persistor, basename }: any) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
        {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
        <React.Suspense fallback={<LayoutSplashScreen />}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            {/* This library only returns the location that has been active before the recent location change in the current window lifetime. */}
            <FlowThemeProvider>
              {/* Render routes with provided `Layout`. */}
              <Routes />
            </FlowThemeProvider>
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  )
}
