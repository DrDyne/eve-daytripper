import {
  SETTINGS_MENU_TOGGLE,
  SWAP_STOCK_AND_LOOT_LISTS
} from '../actions'

export const initialState = {
  stockListPosition: 'left',
  settingsMenuOpen: false
}

export const layout = (state=initialState, action) => {
  if ( SETTINGS_MENU_TOGGLE !== action.type ) return state

  return Object.assign({}, state, {settingsMenuOpen: !state.settingsMenuOpen})
}
