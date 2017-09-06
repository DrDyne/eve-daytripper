import {
  INPUT_PASTE,
  UNDO_PASTE
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  lastPasted: {
    raw: '',
    items: [],
    date: '',
  },
  paste: [],
}

export const history = (state=initialState, action) => {
  switch (action.type) {
    case INPUT_PASTE:
      const { raw } = action
      const items = parseClipboardFromGameClientToJson(raw)
      if ( !items.length ) return state
      const date = new Date()

      console.log({date,items,raw})
      return {
        lastPasted: {
          date,
          items,
          raw,
        },
        paste: [...state.paste, {date, items, raw}],
      }

    case UNDO_PASTE:
      const lastPasted = state.paste.slice().pop()
      return {
        lastPasted,
        paste: state.paste.slice(0,-1),
      }
  }
  return state
}
