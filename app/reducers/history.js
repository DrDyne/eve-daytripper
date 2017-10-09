import {
  CREATE_ROUTE,
  CLEAR_ROUTE_HISTORY,
  INPUT_PASTE,
  INPUT_PASTE_DONE,
  INSPECT_ITEM,
  UNDO_PASTE,
  SAVE_INVENTORY,
  GPS_BUSY,
  GPS_BUSY_DONE,
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  busy: false,
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
  lastOrigin: {
    id: null,
    name: null,
    sec: null
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

export const history = (state=initialState, action) => {
  switch (action.type) {
    case INPUT_PASTE_DONE:
      return Object.assign({}, state, {busy: false})

    case INPUT_PASTE:
      const { raw } = action
      const items = parseClipboardFromGameClientToJson(raw)
      const date = new Date()

      console.log({date,items,raw})
      return Object.assign({}, state, {
        busy: true,
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
      return Object.assign(state, { routes: [], origins: [] })

    case GPS_BUSY:
      return Object.assign(state, { busy: true })

    case GPS_BUSY_DONE:
      return Object.assign(state, { busy: false })
  }

  return state
}
