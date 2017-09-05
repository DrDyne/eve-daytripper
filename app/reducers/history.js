import {
  PASTED,
  UNDO_PASTE
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  lastPasted: {
    raw: '',
    items: [],
    date: '',
  },
  lastPastedRaw: '',
  paste: [],
  inventory: []
}

export const history = (state=initialState, action) => {
  switch (action.type) {
    case PASTED:
      const raw = action.clipboard.getData('Text')
      const items = parseClipboardFromGameClientToJson(raw)
      if ( !items.length ) return state
      const date = new Date()

      return {
        lastPasted: {
          date,
          items,
          raw,
        },
        paste: [...paste, {date, items, raw}],
        inventory: state.inventory
      }
    case UNDO_PASTE:
      const lastPasted = state.paste.slice().pop()
      const lastInventory = state.inventory.slice().pop()
      return {
        lastPasted,
        paste: state.paste.slice(0,-1),
        inventory: state.inventory.slice(0,-1)
      }
  }
  return state
}
