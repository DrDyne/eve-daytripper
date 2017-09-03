export const SET_BREADCRUMBS = 'breadcrumbs:set'
export const SET_BREADCRUMBS_COLOR = 'breadcrumbs:color:set'
export const CHANGE_TAB = 'tab:change'
export const SETTINGS_MENU_TOGGLE = 'menu:settings:toggle'
export const SWAP_STOCK_AND_LOOT_LISTS = 'layout:lists:swap'
export const PASTED = 'event:paste'
export const ADD_STOCK = 'stock:add'
export const REMOVE_STOCK = 'stock:remove'

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

export const pasted = clipboard => ({
  type: PASTED,
  clipboard
})
