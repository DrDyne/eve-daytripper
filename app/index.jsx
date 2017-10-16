import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'
import { createMuiTheme } from 'material-ui/styles'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { thunk } from 'redux-thunk'
import style from '../styles/index.scss'
//import worker from './worker.js'

import Root from './root'
import Reducers from './reducers'
import Middlewares from './middlewares'
import I18n from './i18n'
import { state as initialState } from './store'

const store = createStore(Reducers, initialState, Middlewares)
const muiTheme = createMuiTheme()

const WrappedRoot = (<AppContainer>
  <Provider store={store}>
  <MuiThemeProvider theme={muiTheme}>
  <I18nextProvider i18n={I18n}>
  <Router>
    <Root />
  </Router>
  </I18nextProvider>
  </MuiThemeProvider>
  </Provider>
</AppContainer>)

//if ( 'serviceWorker' in navigator ) navigator.serviceWorker.register('/worker.js')

const element = document.querySelector('#root')
ReactDOM.render(WrappedRoot, element)

if ( module && module.hot ) {
  module.hot.accept('./root', () => {
    ReactDOM.render(WrappedRoot, element)
  })
}
