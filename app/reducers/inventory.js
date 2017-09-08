import {
  ADD_ITEM,
  INPUT_PASTE,
  SET_STOCK,
  UPDATE_INVENTORY_FROM_PASTE,
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'
import { clipboard as cargoMock } from '../store/cargo.pasted.js'

const cargo = parseClipboardFromGameClientToJson(cargoMock)
export const initialState = {
  total: {
    isk: cargo.reduce((memo, i) => memo + i.price, 0),
    volume: cargo.reduce((memo, i) => memo + i.volume, 0),
  },
  items: cargo,
  stock: [{ name: 'Core Scanner Probe I', qty: 8 }],
}

export const byId = id => i => i.id === id
export const byName = name => i => i.name === name

export const addToStock = (state, item) => {
  const stock = [...state.stock, item]
  return Object.assign({}, state, {stock})
}

export const updateStock = (state, item) => {
  const updatedStock = state.stock.slice()
  const stockIndex = items.findIndex(byName(item.name))
  updatedStock[stockIndex].qty = item.qty

  return Object.assign({}, state, {
    stock: updatedStock
  })
}

export const addItem = (state, {id, name, qty, price, volume}) => {
  const total = {
    isk: state.total.isk + price,
    volume: state.total.volume + volume
  }
  const items = [...state.items, {id, name, qty, price, volume}]
  return Object.assign({}, state, { total, items })
}

export const updateItem = (state, {id, name, qty, price, volume}) => {
  const items = state.items.slice() // else update it
  const itemIndex = items.findIndex(byName(name))
  items[itemIndex] = Object.assign(items[itemIndex], { qty, price, volume })
  const total = {
    isk: state.items.reduce((memo, i) => memo + i.price, 0),
    volume: state.items.reduce((memo, i) => memo + i.volume, 0),
  }

  return Object.assign({}, state, { total, items })
}

export const inventory = (state=initialState, action) => {
  const { name, qty } = action

  switch ( action.type ) {
    case ADD_ITEM:
      const item = state.items.find(byName(name))
      if ( !item ) // add it
        return addItem(state, action)
      return updateItem(state, action)

    case SET_STOCK:
      const stock = state.stock.find(byName(name))
      if ( !stock ) // add it
        return addToStock(state, action)
      return updateStock(state, action)
  }

  return state
}
