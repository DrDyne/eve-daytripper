import * as layout from './layout'
import * as inventory from './inventory'
import * as gps from './gps'

export {
  inventory,
  layout,
  gps,
}

export const SET_BREADCRUMBS = 'breadcrumbs:set'
export const SET_BREADCRUMBS_COLOR = 'breadcrumbs:color:set'
export const CHANGE_TAB = 'tab:change'
export const SETTINGS_MENU_TOGGLE = 'menu:settings:toggle'
export const SWAP_STOCK_AND_LOOT_LISTS = 'layout:lists:swap'

export const ADD_ITEM = 'item:add'
export const DELETE_ITEM = 'item:delete'
export const SET_ITEM_INFO = 'item:info'
export const INSPECT_ITEM = 'item:inspect'
export const INSPECT_CLOSE = 'item:inspect:close'

export const SET_STOCK = 'stock:set'
export const REMOVE_STOCK = 'stock:remove'

export const INPUT_PASTE = 'input:paste'
export const UNDO_PASTE = 'paste:undo'
export const LOAD_INVENTORY = 'inventory:load'
export const SAVE_INVENTORY = 'inventory:save'
export const UPDATE_INVENTORY_FROM_PASTE = 'inventory:update'

export const SAVE_CREDENTIALS = 'user:credentials:save'
export const SET_CHAR_INFO = 'char:set'
export const JUMP_TO = 'system:set'
export const BOARD_SHIP = 'ship:set'
export const SET_CAPACITY = 'capacity:set'

export const CREATE_ROUTE = 'gps:route:create'
export const CONFIRM_DELETE_FAVORITE = 'gps:favorites:confirm:delete'
export const CANCEL_DELETE_FAVORITE = 'gps:favorites:cancel:delete'
export const DELETE_FAVORITE = 'gps:favorites:delete'
export const ADD_FAVORITE = 'gps:favorites:add'

export const CLEAR_ROUTE_HISTORY = 'history:routes:clear'

export const setBreadcrumbs = items => ({
  type: SET_BREADCRUMBS,
  items
})

export const setBreadcrumbsColor = color => ({
  type: SET_BREADCRUMBS_COLOR,
  color
})

export const changeTab = activeTab => ({
  type: CHANGE_TAB,
  activeTab
})

export const toggleSettingsMenu = () => ({
  type: SETTINGS_MENU_TOGGLE
})

export const swapListLayout = () => ({
  type: SWAP_STOCK_AND_LOOT_LISTS
})

export const inputPaste = clipboard => ({
  type: INPUT_PASTE,
  clipboard,
  raw: clipboard.getData('Text')
})

export const setStock = ({id, name, qty}) => ({
  type: SET_STOCK,
  id, name, qty
})

export const setItemQty = ({id, name, qty}) => ({
  type: SET_ITEM_QTY,
  id, name, qty
})

export const addOrUpdateItem = ({id, name, qty, m3, isk}) => ({
  type: ADD_ITEM,
  id, name, qty, m3, isk
})

export const deleteItem = ({name}) => ({
  type: DELETE_ITEM,
  name
})

export const setItemInfo = (item, info) => ({
  type: SET_ITEM_INFO,
  name: item.name,
  info
})

export const inspectItem = item => ({
  type: INSPECT_ITEM,
  item
})

export const closeInspect = () => ({
  type: INSPECT_CLOSE
})

export const showInfoDialog = id => (dispatch, getState, {api}) => {
  const { inventory } = getState()
  const item = inventory.items.concat(inventory.stock).find(i => i.id === id)
  if ( item.info ) return dispatch(inspectItem(item))

  api.inventory.info(item.id)
  .then(info => {
    dispatch(setItemInfo(item, info))
    dispatch(inspectItem(item))
  })
}

export const oauthCallback = creds => (dispatch, getState, {api}) => {
  return api.user.authenticate(creds.access_token)
  .then(json => ({
    id: json.CharacterID,
    name: json.CharacterName,
  }))
  // then sign-in to cognito using json.id, return {id, name}
  .then(({id, name}) => {
    dispatch(setCharacterInfo({id, name}))
    dispatch(saveCredentials(creds))
  })
  .catch(console.error.bind('oauth err'))
}

export const setCharacterInfo = ({id, name}) => ({
  type: SET_CHAR_INFO,
  id,
  name,
})

export const saveCredentials = ({access_token, expires_in}) => ({
  type: SAVE_CREDENTIALS,
  token: access_token,
  expires: expires_in,
})

export const setCapacity = m3 => ({
  type: SET_CAPACITY,
  m3,
})

export const saveInventory = inventory => ({
  type: SAVE_INVENTORY,
  inventory
})

export const createRoute = systems => ({
  type: CREATE_ROUTE,
  systems
})

export const confirmDeleteFavorite = system => ({
  type: CONFIRM_DELETE_FAVORITE,
  system
})

export const cancelDeleteFavorite = () => ({
  type: CANCEL_DELETE_FAVORITE
})

export const deleteFavorite = system => ({
  type: DELETE_FAVORITE,
  system
})

export const addFavorite = system => ({
  type: ADD_FAVORITE,
  system
})

export const clearRouteHistory = () => ({
  type: CLEAR_ROUTE_HISTORY
})
