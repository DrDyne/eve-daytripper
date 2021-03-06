import { createMember } from '../reducers/fleet'
import * as layout from './layout'
import * as inventory from './inventory'
import * as gps from './gps'
import * as user from './user'
import * as fleet from './fleet'
import * as history from './history'

export {
  fleet,
  gps,
  history,
  inventory,
  layout,
  user,
}

export const PROFILE_CHUNK = 'profile:chunk'
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
export const INVENTORY_BUSY = 'inventory:busy'
export const INVENTORY_BUSY_DONE = 'inventory:busy:done'

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
export const inventoryBusy = () => ({ type: INVENTORY_BUSY })
export const inventoryBusyDone = () => ({ type: INVENTORY_BUSY_DONE })
export const setStock = ({id, name, qty}) => ({ type: SET_STOCK, id, name, qty })
export const addOrUpdateItem = ({id, name, qty, m3, isk}) => ({ type: ADD_ITEM, id, name, qty, m3, isk })
export const deleteItem = ({name}) => ({ type: DELETE_ITEM, name })
export const setItemInfo = (item, info) => ({ type: SET_ITEM_INFO, name: item.name, info })
export const inspectItem = item => ({ type: INSPECT_ITEM, item })
export const closeInspect = () => ({ type: INSPECT_CLOSE })
export const setCharacterInfo = ({id, name}) => ({ type: SET_CHAR_INFO, id, name, })
export const setCapacity = m3 => ({ type: SET_CAPACITY, m3, })
export const deleteRouteByOrigin = origin => ({ type: GPS_DELETE_ROUTE, origin })
export const clearRouteHistory = () => ({ type: CLEAR_ROUTE_HISTORY })

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

//charId is not provided at 1st login, it comes from localStorage after ccp oauth
export const loadProfile = charId => (dispatch, getState, {api}) => {
  dispatch(layout.loadProfile())

  return api.user.loadProfile(charId) // charId is discarded for now
  .then(({Fleet, Inventory, Origins, Routes, Favorites, Avoidance}) => {
    console.log('loaded profile:', Fleet, Inventory, Origins, Routes, Favorites, Avoidance)

    return Promise.all([
      dispatch(history.init(Origins)),
      dispatch(gps.init(Routes, Favorites, Avoidance)),
      dispatch(fleet.init(Fleet)),
      dispatch(inventory.init(Inventory)),
    ])
  })
  .catch(err => {
    console.group('failed to load profile')
    console.error(err)
    console.groupEnd()

    const character = getState().char
    dispatch(fleet.init({
      commander: character.id,
      members: [ createMember(character) ]
    }))
  })
  //.then(() => setTimeout(() => dispatch(layout.profileLoaded()), 840))
  .then(() => dispatch(layout.profileLoaded()))
}

export const saveProfile = type => (dispatch, getState, {api}) => {
  dispatch(layout.saveProfile())

  const { fleet, inventory } = getState()
  const { origins } = getState().history
  const { routes, favorites, avoidance } = getState().gps

  const options = {
    all: { fleet, inventory, origins, routes, favorites, avoidance },
    fleet: { fleet },
    inventory: { inventory },
    gps: { origins, routes, favorites, avoidance }
  }

  const saveMyProfile = chunk => api.user.saveProfile(fleet.commander, chunk)

  dispatch({type: PROFILE_CHUNK, chunkType: type, chunk: options[type]})

  if ( 'all' === type )
    return saveMyProfile(options.all)
    .then(() => dispatch(layout.profileSaved()))

  return Promise.all([
    'fleet' === type && saveMyProfile(options.fleet),
    'inventory' === type && saveMyProfile(options.inventory),
    'gps' === type && saveMyProfile(options.gps)
  ])
  .then(() => dispatch(layout.profileSaved()))
}
