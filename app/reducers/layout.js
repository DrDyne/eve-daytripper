import {
  SETTINGS_MENU_TOGGLE,
  SWAP_STOCK_AND_LOOT_LISTS
} from '../actions'

const STOCK_POS_LEFT = 'left'
const STOCK_POS_RIGHT = 'right'

export const initialState = {
  stockListPosition: STOCK_POS_LEFT,
  settingsMenuOpen: false
}

const toggleSettingsMenu = state => {
  console.log('toggling settings menu')
  const settingsMenuOpen = !state.settingsMenuOpen
  return Object.assign({}, state, {settingsMenuOpen})
}

const swapLists = state => {
  const stockListPosition = (STOCK_POS_LEFT === state.stockListPosition) ? STOCK_POS_RIGHT : STOCK_POS_LEFT
  return Object.assign({}, state, {stockListPosition})
}

export const layout = (state=initialState, action) => {
  switch ( action.type ) {
    case SETTINGS_MENU_TOGGLE: return toggleSettingsMenu(state)
    case SWAP_STOCK_AND_LOOT_LISTS: return swapLists(state)
  }
  return state
}
