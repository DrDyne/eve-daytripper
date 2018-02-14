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
  origins: [],
  inspect: null,
}

export const deleteSystem = (state, {system}) => {
  const origins = state.origins
  .filter(({id}) => id !== system.id)

  return Object.assign({}, state, { origins })
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
  const { origins } = action
  return Object.assign({}, state, { origins })
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

    case CLEAR_ROUTE_HISTORY:
      return Object.assign({}, state, { origins: [] })

    case GPS_IDENTIFIED_SYSTEM:
      return addSystemToOrigins(state, action)

    case HISTORY_INIT:
      return init(state, action)

    case DELETE_SYSTEM:
      return deleteSystem(state, action)
  }

  return state
}
