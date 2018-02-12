import {
  addOrUpdateItem,
  setStock,
  deleteItem,
  inventoryBusy,
  inventoryBusyDone,
  saveProfile,
} from './index.js'

export const INVENTORY_INIT = 'inventory:init'
export const INVENTORY_RESET = 'inventory:reset'
export const INVENTORY_SAVED = 'inventory:saved'

const byName = name => i => i.name === name

export const init = ({capacity, total, items, stock}) => ({
  type: INVENTORY_INIT,
  capacity,
  total,
  items,
  stock
})

export const clearMissingItemsAfterPaste = () => (dispatch, getState) => {
  const { inventory, history } = getState()
  //if ( !history.lastPasted.items.length ) return // prevents reseting inventory at page load, but button should be hidden until paste event... so no need for double security

  inventory.items.forEach(({name, qty}) => {
    if ( 0 === qty ) return

    const pasted = history.lastPasted.items.find(byName(name))
    if ( !pasted ) dispatch(deleteItem({name}))
  })
}

export const sellMissingItemsAfterPaste = () => (dispatch, getState) => {
}

export const updateInventoryFromPaste = () => (dispatch, getState, {api}) => {
  const { history, inventory } = getState()
  const identifications = history.lastPasted.items.map(item => {

    return api.inventory.identify(item.name)
    .then(id => {
      const itemWithId = Object.assign({}, item, {id})
      dispatch(addOrUpdateItem(itemWithId))

      const inStock = inventory.stock.find(byName(item.name))
      if ( inStock && !inStock.id )
        dispatch(setStock({
          id: itemWithId.id,
          name: item.name,
        }))
    })
  })

  dispatch(inventoryBusy())
  return Promise.all(identifications)
  .then(() => dispatch(inventoryBusyDone()))
  .then(() => dispatch(saveProfile('inventory')))
  .catch(err => {
    dispatch(inventoryBusyDone())
    throw err
  })
}
