import { makePortraitUrl } from '../api/utils'
import {
  JUMP_TO,
  BOARD_SHIP,
  SET_CHAR_INFO
} from '../actions'

export const initialState = {
  id: null,
  name: 'Capsuleer',
  portrait: makePortraitUrl(1),
  system: null,
  ship: null,
}

export const char = (state=initialState, action) => {
  switch (action.type) {
    case JUMP_TO: // set system
    case BOARD_SHIP: // set ship
    case SET_CHAR_INFO: // set id, name, portrait
      const { id, name } = action
      return Object.assign({}, state, {
        id,
        name,
        portrait: makePortraitUrl(id)
      })
  }
  return state
}
