import {
  ADD_ITEM,
  INPUT_PASTE,
  SET_STOCK,
  UPDATE_INVENTORY_FROM_PASTE,
} from '../actions'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  capacity: 400,
  total: {
    isk: 527854.52,
    m3: 27,
  },
  items: [{
    name: '10MN Afterburner I', qty: 1, id: 12056, m3: 25, isk: 46321.04
  }, {
    name: 'Nanite Repair Paste', qty: 200, id: 28668, m3: 2, isk: 481533.48
  }],
  stock: [{
    name: 'Core Scanner Probe I', qty: 8, id: 30013
  }, {
    name: 'Nanite Repair Paste', qty: 18, id: 28668
  }],
}

export const byId = id => i => i.id === id
export const byName = name => i => i.name === name

export const addToStock = (state, item) => {
  const stock = [...state.stock, item]
  return Object.assign({}, state, {stock})
}

export const updateStock = (state, {id, name, qty}) => {
  const stockIndex = state.stock.findIndex(byName(name))
  const updatedStock = state.stock.slice()
  if ( id ) updatedStock[stockIndex].id = id
  if ( qty ) updatedStock[stockIndex].qty = qty

  return Object.assign({}, state, {
    stock: updatedStock
  })
}

export const addItem = (state, {id, name, qty, isk, m3}) => {
  const total = {
    isk: state.total.isk + isk,
    m3: state.total.m3 + m3
  }
  const items = [...state.items, {id, name, qty, isk, m3}]
  return Object.assign({}, state, { total, items })
}

export const updateItem = (state, {id, name, qty, isk, m3}) => {
  const items = state.items.slice() // else update it
  const itemIndex = items.findIndex(byName(name))
  items[itemIndex] = Object.assign(items[itemIndex], { qty, isk, m3 })
  const total = {
    isk: state.items.reduce((memo, i) => memo + i.isk, 0),
    m3: state.items.reduce((memo, i) => memo + i.m3, 0),
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
