import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as api from '../api'
import { dispatchLogger } from './dispatch-logger'
import {
  //inventoryCleaner,
  inventoryLogger
} from './inventory'

export const middlewares = [
  thunk.withExtraArgument({api}),
  dispatchLogger,
  inventoryLogger,
  //inventoryCleaner,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const Middlewares = composeEnhancers(applyMiddleware(...middlewares))

export default Middlewares
