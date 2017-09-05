import {
  ADD_ITEM,
  INPUT_PASTE,
  SET_STOCK,
  UPDATE_INVENTORY_FROM_PASTE,
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  items: [],
  stock: []
}

export const byName = name => item => item.name === name

export const addToStock = (state, item) => ({
  items: state.items,
  stock: [...state.stock, item],
})

export const updateStock = (state, item) => {
  const updatedStock = state.stock.slice() // else update it
  const stockIndex = items.findIndex(byName(item.name))
  updatedStock[stockIndex].qty = item.qty

  return {
    items: state.items,
    stock: updatedStock
  }
}

export const addItem = (state, item) => {
  return {
    items: [...state.items, {name, qty}],
    stock: state.stock
  }
}

export const updateItem = (state, item) => {
  const items = state.items.slice() // else update it
  const itemIndex = items.findIndex(byName(name))
  items[itemIndex].qty += qty

  return {
    items,
    stock: state.stock
  }
}

export const inventory = (state=initialState, action) => {
  const { name, qty } = action

  switch ( action.type ) {
    case ADD_ITEM:
      const item = state.items.find(byName(name))
      if ( !item ) // add it
        return addItem(state, {name, qty})
      return updateItem(state, {name, qty})

    case SET_STOCK:
      const stock = state.stock.find(byName(name))
      if ( !stock ) // add it
        return addToStock(state, {name, qty})
      return updateStock(state, {name, qty})

    case UPDATE_INVENTORY_FROM_PASTE:

    case INPUT_PASTE:
      const items = parseClipboardFromGameClientToJson(action.clipboard.getData('Text'))
      if ( !items.length ) return state

      // dispatch ADD_ITEM for each item
      // then cleanup items with qty=0

      //test
      items.forEach(pastedItem => {
        const item =  state.items.find(byName(pastedItem.name))
        if ( item ) {
          if ( item.qty === pastedItem.qty ) return
          else console.log(`update ${pastedItem.name} (${pastedItem.qty - item.qty})`)
        }
        else
          console.log(`add x${pastedItem.qty} ${pastedItem.name} to loot list !`)
      })

  }

return state
}
