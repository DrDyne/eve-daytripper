import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../api'
import { dispatchLogger } from './dispatch-logger'
import { inventoryLogger } from './inventory'
import actionTracker from './action-tracker'

export const middlewares = [
  thunk.withExtraArgument({api}),
  dispatchLogger,
  inventoryLogger,
  actionTracker,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Middlewares = composeEnhancers(applyMiddleware(...middlewares))

export default Middlewares
