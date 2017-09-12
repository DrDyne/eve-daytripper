export const SET_BREADCRUMBS = 'breadcrumbs:set'
export const SET_BREADCRUMBS_COLOR = 'breadcrumbs:color:set'
export const CHANGE_TAB = 'tab:change'
export const SETTINGS_MENU_TOGGLE = 'menu:settings:toggle'
export const SWAP_STOCK_AND_LOOT_LISTS = 'layout:lists:swap'

export const ADD_ITEM = 'item:add'
export const DELETE_ITEM = 'item:delete'


export const SET_STOCK = 'stock:set'
export const REMOVE_STOCK = 'stock:remove'

export const INPUT_PASTE = 'input:paste'
export const UNDO_PASTE = 'paste:undo'
export const SAVE_INVENTORY = 'save:inventory'

export const UPDATE_INVENTORY_FROM_PASTE = 'inventory:update:from=paste'

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
  id,
  name,
  qty
})

export const addOrUpdateItem = ({id, name, qty, volume, price}) => ({
  type: ADD_ITEM,
  id,
  name,
  qty,
  volume,
  price
})

export const deleteItem = ({name}) => ({
  type: DELETE_ITEM,
  name
})

export const updateInventoryFromPaste = () => (dispatch, getState, {api}) => {
  const { history, inventory } = getState()
  const identifications = history.lastPasted.items.map(item => {
    const byName = i => i.name === item.name

    return api.identify(item.name)
    .then(id => {
      const itemWithId = Object.assign({}, item, {id})
      dispatch(addOrUpdateItem(itemWithId))

      const inStock = inventory.stock.find(byName)
      if ( inStock && !inStock.id )
        dispatch(setStock({
          id: itemWithId.id,
          name: item.name,
        }))
    })
  })

  return Promise.all(identifications)
}

export const sellMissingFromPaste = () => (dispatch, getState) => {
}

export const clearMissingFromPaste = () => (dispatch, getState) => {
  const { inventory, history } = getState()
  inventory.items.forEach(({name}) => {
    const pasted = history.lastPasted.items.find(i => name === i.name)
    if ( !pasted ) dispatch(deleteItem({name}))
  })
}

export const inventoryHistory = {
  push: inventory => ({
    type: SAVE_INVENTORY,
    inventory
  })
}

export const saveInventory = () => (dispatch, getState) => {
  const { total } = getState().inventory.items
  dispatch(inventoryHistory.push(getState().inventory))
}
