import {
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
  paste: [],
  inventory: [],
  inspect: null,
}

export const history = (state=initialState, action) => {
  switch (action.type) {
    case INPUT_PASTE:
      const { raw } = action
      const items = parseClipboardFromGameClientToJson(raw)
      if ( !items.length ) return state
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
          total: inventory.total
        },
        inventory: [...state.inventory, inventory]
      })

    case UNDO_PASTE:
      const lastPasted = state.paste.slice().pop()
      return {
        lastPasted,
        paste: state.paste.slice(0,-1),
      }
  }
  return state
}
