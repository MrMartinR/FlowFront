import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { reduxBatch } from '@manaflair/redux-batch'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { rootReducer, rootSaga } from './rootReducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true
  }),
  sagaMiddleware
]

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['icons'] // only icons will be persisted
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch]
})

/**
 * See {@link https://github.com/rt2zz/redux-persist#persiststorestore-config-callback}
 *
 * See {@link https://github.com/rt2zz/redux-persist#persistor-object}
 */
export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export default store
