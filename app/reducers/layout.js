import {
  SETTINGS_MENU_TOGGLE,
  SWAP_STOCK_AND_LOOT_LISTS
} from '../actions'

import {
  TOGGLE_SHOW_EMPTY_STOCK,
} from '../actions/layout'

const STOCK_POS_LEFT = 'left'
const STOCK_POS_RIGHT = 'right'

export const initialState = {
  stockListPosition: STOCK_POS_LEFT,
  settingsMenuOpen: false,
  showEmptyStock: false
}

const toggleSettingsMenu = state => {
  const settingsMenuOpen = !state.settingsMenuOpen
  return Object.assign({}, state, {settingsMenuOpen})
}

const toggleShowEmptyStock = state => {
  const showEmptyStock = !state.showEmptyStock
  return Object.assign({}, state, {showEmptyStock})
}

const swapLists = state => {
  const stockListPosition = (STOCK_POS_LEFT === state.stockListPosition) ? STOCK_POS_RIGHT : STOCK_POS_LEFT
  return Object.assign({}, state, {stockListPosition})
}

export const layout = (state=initialState, action) => {
  switch ( action.type ) {
    case SETTINGS_MENU_TOGGLE: return toggleSettingsMenu(state)
    case SWAP_STOCK_AND_LOOT_LISTS: return swapLists(state)
    case TOGGLE_SHOW_EMPTY_STOCK: return toggleShowEmptyStock(state)
  }
  return state
}
