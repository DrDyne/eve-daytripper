import {
  SETTINGS_MENU_TOGGLE,
  SWAP_STOCK_AND_LOOT_LISTS,
  INSPECT_ITEM,
  INSPECT_CLOSE,
  CONFIRM_DELETE_FAVORITE,
  CANCEL_DELETE_FAVORITE,
  DELETE_FAVORITE,
  INVENTORY_BUSY,
  INVENTORY_BUSY_DONE,
} from '../actions'

import {
  TOGGLE_SHOW_EMPTY_STOCK,
  TOGGLE_FAVORITE_ROUTES,
  TOGGLE_SHORTEST_ROUTES,
  TOGGLE_SIDE_FLEET,
  TOGGLE_SIDE_INVENTORY,
  TOGGLE_SIDE_NAVIGATION,
  PROFILE_SAVE_START,
  PROFILE_SAVE_END,
  PROFILE_LOAD_START,
  PROFILE_LOAD_END,
  SKIP_ORIGINS_HISTORY,
} from '../actions/layout'

import {
  GPS_BUSY,
  GPS_BUSY_DONE,
} from '../actions/gps'

const STOCK_POS_LEFT = 'left'
const STOCK_POS_RIGHT = 'right'

const config = {
  save: (key, value) => localStorage.setItem(key, value),
  load: (key, defaultValue) => {
    const value = localStorage.getItem(key)

    return "true" === value ? true
    : "false" === value ? false
    : null === value ? defaultValue
    : value
  }
}

export const initialState = {
  profileSaving: false,
  profileLoading: false,
  gpsBusy: false,
  contentLayout: 'vertical', // 'vertical', 'side-to-side', 'tabs'
  stockListPosition: STOCK_POS_LEFT,
  settingsMenuOpen: false,
  showEmptyStock: false,
  showInfoDialog: false,
  showConfirmDeleteFavoritesDialog: false,
  showFavoriteRoutes: config.load('showFavoriteRoutes', true),
  showShortestRoutes: config.load('showShortestRoutes', true),
  fleetVisibility: config.load('fleetVisibility', true),
  inventoryVisibility: config.load('inventoryVisibility', false),
  navigationVisibility: config.load('navigationVisibility', false),
  skipOriginsHistory: 0,

  primaryColor: 'rgb(245, 0, 87)',
}

const toggleSettingsMenu = state => {
  const settingsMenuOpen = !state.settingsMenuOpen
  return Object.assign({}, state, {settingsMenuOpen})
}

const toggleShowEmptyStock = state => {
  const showEmptyStock = !state.showEmptyStock
  return Object.assign({}, state, {showEmptyStock})
}

const toggleFavoriteRoutes = state => {
  const showFavoriteRoutes = !state.showFavoriteRoutes
  config.save('showFavoriteRoutes', showFavoriteRoutes)
  return Object.assign({}, state, {showFavoriteRoutes})
}

const swapLists = state => {
  const stockListPosition = (STOCK_POS_LEFT === state.stockListPosition) ? STOCK_POS_RIGHT : STOCK_POS_LEFT
  return Object.assign({}, state, {stockListPosition})
}

const showDeleteFavoriteDialog = (state, system) => {
  const showConfirmDeleteFromFavoritesDialog = system.id
  return Object.assign({}, state, {showConfirmDeleteFavoritesDialog})
}

const closeDeleteFavoriteDialog = state => {
  const showConfirmDeleteFavoritesDialog = false
  return Object.assign({}, state, {showConfirmDeleteFavoritesDialog})
}

const toggleShortestRoutes = state => {
  const showShortestRoutes = !state.showShortestRoutes
  config.save('showShortestRoutes', showShortestRoutes)
  return Object.assign({}, state, { showShortestRoutes })
}

const toggleFleetVisibility = state => {
  const fleetVisibility = !state.fleetVisibility
  config.save('fleetVisibility', fleetVisibility)
  return Object.assign({}, state, { fleetVisibility })
}

const toggleInventoryVisibility = state => {
  const inventoryVisibility = !state.inventoryVisibility
  config.save('inventoryVisibility', inventoryVisibility)
  return Object.assign({}, state, { inventoryVisibility })
}

const toggleNavigationVisibility = state => {
  const navigationVisibility = !state.navigationVisibility
  config.save('navigationVisibility', navigationVisibility)
  return Object.assign({}, state, { navigationVisibility })
}

export const layout = (state=initialState, action) => {
  switch ( action.type ) {
    case INSPECT_ITEM: return Object.assign({}, state, {showInfoDialog: true})
    case INSPECT_CLOSE: return Object.assign({}, state, {showInfoDialog: false})
    case SETTINGS_MENU_TOGGLE: return toggleSettingsMenu(state)
    case SWAP_STOCK_AND_LOOT_LISTS: return swapLists(state)
    case CONFIRM_DELETE_FAVORITE: return showDeleteFavoriteDialog(state, action.system)
    case CANCEL_DELETE_FAVORITE: return closeDeleteFavoriteDialog(state)
    case DELETE_FAVORITE: return closeDeleteFavoriteDialog(state)
    case TOGGLE_SHOW_EMPTY_STOCK: return toggleShowEmptyStock(state)
    case TOGGLE_FAVORITE_ROUTES: return toggleFavoriteRoutes(state)
    case TOGGLE_SHORTEST_ROUTES: return toggleShortestRoutes(state)
    case TOGGLE_SIDE_FLEET: return toggleFleetVisibility(state)
    case TOGGLE_SIDE_INVENTORY: return toggleInventoryVisibility(state)
    case TOGGLE_SIDE_NAVIGATION: return toggleNavigationVisibility(state)
    case GPS_BUSY: return Object.assign({}, state, { gpsBusy: true })
    case GPS_BUSY_DONE: return Object.assign({}, state, { gpsBusy: false })
    case INVENTORY_BUSY: return Object.assign({}, state, { inventoryBusy: true })
    case INVENTORY_BUSY_DONE: return Object.assign({}, state, { inventoryBusy: false })
    case PROFILE_SAVE_START: return Object.assign({}, state, { profileSaving: true })
    case PROFILE_SAVE_END: return Object.assign({}, state, { profileSaving: false })
    case PROFILE_LOAD_START: return Object.assign({}, state, { profileLoading: true })
    case PROFILE_LOAD_END: return Object.assign({}, state, { profileLoading: false })
    case SKIP_ORIGINS_HISTORY: return Object.assign({}, state, { skipOriginsHistory: action.nbOrigins })
  }
  return state
}
