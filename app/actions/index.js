import * as layout from './layout'
import * as inventory from './inventory'
import * as gps from './gps'
import * as user from './user'
import * as fleet from './fleet'

export {
  inventory,
  fleet,
  layout,
  gps,
  user,
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
export const INPUT_PASTE_DONE = 'input:paste:done'
export const UNDO_PASTE = 'paste:undo'
export const UPDATE_INVENTORY_FROM_PASTE = 'inventory:update'

export const SET_CHAR_INFO = 'char:set'
export const JUMP_TO = 'system:set'
export const BOARD_SHIP = 'ship:set'
export const SET_CAPACITY = 'capacity:set'

export const HISTORY_INIT = 'history:init'
export const CLEAR_ROUTE_HISTORY = 'history:routes:clear'

export const setBreadcrumbs = items => ({ type: SET_BREADCRUMBS, items })
export const setBreadcrumbsColor = color => ({ type: SET_BREADCRUMBS_COLOR, color })
export const changeTab = activeTab => ({ type: CHANGE_TAB, activeTab })
export const toggleSettingsMenu = () => ({ type: SETTINGS_MENU_TOGGLE })
export const swapListLayout = () => ({ type: SWAP_STOCK_AND_LOOT_LISTS })
export const inputPaste = clipboard => ({ type: INPUT_PASTE, clipboard, raw: clipboard.getData('Text') })
export const inputPasteDone = () => ({ type: INPUT_PASTE_DONE, })
export const setStock = ({id, name, qty}) => ({ type: SET_STOCK, id, name, qty })
export const setItemQty = ({id, name, qty}) => ({ type: SET_ITEM_QTY, id, name, qty })
export const addOrUpdateItem = ({id, name, qty, m3, isk}) => ({ type: ADD_ITEM, id, name, qty, m3, isk })
export const deleteItem = ({name}) => ({ type: DELETE_ITEM, name })
export const setItemInfo = (item, info) => ({ type: SET_ITEM_INFO, name: item.name, info })
export const inspectItem = item => ({ type: INSPECT_ITEM, item })
export const closeInspect = () => ({ type: INSPECT_CLOSE })
export const setCharacterInfo = ({id, name}) => ({ type: SET_CHAR_INFO, id, name, })
export const setCapacity = m3 => ({ type: SET_CAPACITY, m3, })
export const deleteRouteByOrigin = origin => ({ type: GPS_DELETE_ROUTE, origin })
export const clearRouteHistory = () => ({ type: CLEAR_ROUTE_HISTORY })
export const initHistory = origins => ({ type: HISTORY_INIT, origins })

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

  return api.user.ccpIdentify(creds.access_token)
  .then(json => {
    console.log('auth success', json)
    return {
      id: json.CharacterID,
      name: json.CharacterName,
    }
  })
  .then(character => {
    dispatch(setCharacterInfo(character))
    dispatch(fleet.add(character))

    // save new characterId to cognito profile instead
    //api.user.cognitoIdentify(character)
    //.then(cognitoCreds => {
    //  console.log(cognitoCreds,
    //    cognitoCreds.getAccessToken(),
    //    cognitoCreds.getAccessToken().getJwtToken()
    //  )
    //})
    //// .then( load app state from /inventory
    //.catch(err => {
    //  console.error(err)
    //  throw err
    //})


    return character
  })
  .catch(err => {
    console.error('oauth err', err)
    throw err
  })
}

export const loadProfile = () => (dispatch, getState, {api}) => {
  console.log('load user profile using api to fetch s3')

  return api.user.loadProfile()
  .then(Profile => {
    console.log(Profile)
    dispatch(gps.init(Profile.gps))
    dispatch(fleet.init(Profile.fleet))
    dispatch(inventory.init(Profile.inventory))
    dispatch(initHistory(Profile.gps.origins))
  })
}
