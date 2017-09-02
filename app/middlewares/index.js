import { applyMiddleware, compose } from 'redux'
import { api } from './api'
import { dispatchLogger } from './dispatch-logger'

export const middlewares = [
  api,
  dispatchLogger,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Middlewares = composeEnhancers(applyMiddleware(...middlewares))

export default Middlewares
