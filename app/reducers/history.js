import {
  CREATE_ROUTE,
  INPUT_PASTE,
  INSPECT_ITEM,
  UNDO_PASTE,
  SAVE_INVENTORY,
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

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
  lastOrigin: {
    id: null,
    name: null,
    sec: null
  },
  paste: [],
  inventory: [],
  routes: [],
  inspect: null,
}

const byId = (origin, destination) => route => {
  return route.origin.id === origin.id
  && route.destination.id === destination.id
}

export const createRoute = (state, action) => {
  const { systems } = action
  const [origin, jumps, destination] = [
    systems[0],
    systems.length,
    systems.slice().pop()
  ]

  console.log('push route to history:', origin, jumps, destination)

  const savedRoute = state.routes.find(byId(origin, destination))

  return savedRoute
  ? state
  : Object.assign({}, state, {
    lastOrigin: origin,
    routes: [{origin, jumps, destination}, ...state.routes]
  })
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
  }
  return state
}
