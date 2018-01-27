import {
  CLEAR_ROUTE_HISTORY,
  INPUT_PASTE,
  INPUT_PASTE_DONE,
  INSPECT_ITEM,
  UNDO_PASTE,
  SAVE_INVENTORY,
  HISTORY_INIT,
} from '../actions'

import {
  CREATE_ROUTE,
  DELETE_SYSTEM,
  GPS_IDENTIFIED_SYSTEM,
} from '../actions/gps'

import {
  parseClipboardFromGameClientToJson,
} from './utils'

export const initialState = {
  lastPasted: {
    raw: '',
    items: [],
    date: '',
  },
  lastInventory: {
    total: {
      isk: 0,
      m3: 0,
    }
  },
  paste: [],
  inventory: [],
  routes: [],
  origins: [],
  inspect: null,
}

const byId = (origin, destination) => route => {
  return route.origin.id === origin.id
  && route.destination.id === destination.id
}

export const deleteSystem = (state, {system}) => {
  const origins = state.origins
  .filter(({id}) => id !== system.id)

  return Object.assign({}, state, { origins })
}

export const createRoute = (state, action) => {
  const { systems } = action
  const [ origin, destination ] = [
    systems.shortest[0],
    systems.shortest.slice().pop()
  ]

  const origins = state.origins.find(o => o.name === origin.name)
  ? state.origins
  : [...state.origins, origin]

  console.log('push route to history:', origin, destination)

  const savedRoute = state.routes.find(byId(origin, destination))

  return savedRoute
  ? state
  : Object.assign({}, state, {
    lastOrigin: origin,
    origins,
    routes: [{origin, destination}, ...state.routes]
  })
}

export const addSystemToOrigins = (state, action) => {
  const { system } = action
  const byName = name => s => name === s.name
  const origins = state.origins.find(byName(system.name))
  ? state.origins
  : [...state.origins, action.system]

  return Object.assign({}, state, { origins })
}

export const init = (state, action) => {
  const { routes, origins } = action
  return Object.assign({}, state, { origins, routes })
}

export const history = (state=initialState, action) => {
  switch (action.type) {

    case INPUT_PASTE:
      const { raw } = action
      const items = parseClipboardFromGameClientToJson(raw)
      const date = new Date()

      console.log({date,items,raw})
      return Object.assign({}, state, {
        lastPasted: {
          date,
          items,
          raw,
        },
        paste: [...state.paste, {date, items, raw}],
      })

    case INSPECT_ITEM:
      return Object.assign({}, state, { inspect: action.item })

    case SAVE_INVENTORY:
      const { inventory } = action
      return Object.assign({}, state, {
        lastInventory: {
          total: inventory.total,
        },
        inventory: [...state.inventory, inventory]
      })

    case UNDO_PASTE:
      const lastPasted = state.paste.slice().pop()
      return {
        lastPasted,
        paste: state.paste.slice(0,-1),
      }

    case CREATE_ROUTE:
      return createRoute(state, action)

    case CLEAR_ROUTE_HISTORY:
      return Object.assign({}, state, { routes: [], origins: [] })

    case GPS_IDENTIFIED_SYSTEM:
      return addSystemToOrigins(state, action)

    case HISTORY_INIT:
      return init(state, action)

    case DELETE_SYSTEM:
      return deleteSystem(state, action)
  }

  return state
}
