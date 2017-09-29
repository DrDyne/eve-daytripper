import {
  addOrUpdateItem,
  setStock,
  deleteItem,
  inventoryHistoryPush,
  saveInventory,
} from './index.js'

const byName = name => i => i.name === name

export const clearMissingItemsAfterPaste = () => (dispatch, getState, {api}) => {
  const { inventory, history } = getState()
  //if ( !history.lastPasted.items.length ) return // prevents reseting inventory at page load, but button should be hidden until paste event... so no need for double security

  inventory.items.forEach(({name, qty}) => {
    if ( 0 === qty ) return

    const pasted = history.lastPasted.items.find(byName(name))
    if ( !pasted ) dispatch(deleteItem({name}))
  })
}

export const sellMissingItemsAfterPaste = () => (dispatch, getState, {api}) => {
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

  return Promise.all(identifications)
}


export const save = () => (dispatch, getState) => {
  dispatch(saveInventory(getState().inventory))
}
