import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'

import './config/ReactotronConfig'

import { store, persistor } from './store'

import createRouter from './routes'

export default function Index() {
  const Routes = createRouter(false)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle='light-content' backgroundColor='#402845' />
        <Routes />
      </PersistGate>
    </Provider>
  )
}
