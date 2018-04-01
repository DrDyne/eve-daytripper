import {
  ADD_ITEM,
  DELETE_ITEM,
  INPUT_PASTE,
  INSPECT_ITEM,
  SET_CAPACITY,
  SET_STOCK,
  SET_ITEM_INFO,
  UPDATE_INVENTORY_FROM_PASTE,
} from 'App/actions'
import {
  INVENTORY_CLEAR_ITEMS,
  INVENTORY_CLEAR_STOCK,
  INVENTORY_INIT ,
  INVENTORY_RESET,
} from 'App/actions/inventory'
import { parseClipboardFromGameClientToJson } from './utils'

export const initialState = {
  capacity: 5,
  total: {
    isk: 0, //527854.52,
    m3: 0, //27,
  },
  items: [],
  stock: [],
  //  [{
  //  name: '10MN Afterburner I', qty: 1, id: 12056, m3: 25, isk: 46321.04
  //}, {
  //  name: 'Nanite Repair Paste', qty: 200, id: 28668, m3: 2, isk: 481533.48
  //}],
  //stock: [{
  //  name: 'Core Scanner Probe I', qty: 8, id: 30013
  //}, {
  //  name: 'Nanite Repair Paste', qty: 18, id: 28668
  //}],
}

export const init = (state, action) => {
  const { capacity, total, items, stock } = action
  return Object.assign({}, state, {
    capacity,
    total,
    items,
    stock
  })
}

export const byId = id => i => i.id === id
export const byName = name => i => i.name === name

export const addToStock = (state, {id, name, qty}) => {
  const stock = [...state.stock, {id, name, qty}]
  return Object.assign({}, state, {stock})
}

export const updateStock = (state, {id, name, qty}) => {
  const stock = [...state.stock]
  const stockIndex = stock.findIndex(byName(name))
  if ( id ) stock[stockIndex].id = id
  if ( qty ) stock[stockIndex].qty = qty

  return Object.assign({}, state, { stock })
}

export const addItem = (state, {id, name, qty, isk, m3}) => {
  const total = {
    isk: state.total.isk + isk,
    m3: state.total.m3 + m3
  }
  const items = [...state.items, {id, name, qty, isk, m3}]
  return Object.assign({}, state, { total, items })
}

export const deleteItem = (state, {name}) => {
  return updateItem(state, { name, qty: 0, isk: 0, m3: 0, })
}

export const updateItem = (state, {id, name, qty, isk, m3}) => {
  const items = [...state.items] // else update it
  const index = items.findIndex(byName(name))
  items[index] = Object.assign(items[index], { qty, isk, m3 })
  const total = {
    isk: state.items.reduce((memo, i) => memo + i.isk, 0),
    m3: state.items.reduce((memo, i) => memo + i.m3, 0),
  }

  return Object.assign({}, state, { total, items })
}

export const clearItems = state => {
  const total = { isk: 0, m3: 0 }
  const items = []
  return Object.assign({}, state, { items, total })
}

export const clearStock = state => {
  const stock = state.stock.map(({id, name}) => ({id, name, qty: 0}))
  return Object.assign({}, state, { stock })
}

export const setInfo = (state, name, info) => {
  console.log(info.description)
  return Object.assign({}, state, {
    items: state.items.map(item => {
      if ( name !== item.name ) return item
      return Object.assign(item, {info})
    }),
    stock: state.stock.map(item => {
      if ( name !== item.name ) return item
      return Object.assign(item, {info})
    })
  })
}

export const inventory = (state=initialState, action) => {
  const { name, qty } = action

  switch ( action.type ) {
    case ADD_ITEM:
      const item = state.items.find(byName(name))
      if ( !item ) // add it
        return addItem(state, action)
      return updateItem(state, action)

    case DELETE_ITEM:
      return deleteItem(state, action)

    case SET_ITEM_INFO:
      return setInfo(state, name, action.info)

    case SET_STOCK:
      const stock = state.stock.find(byName(name))
      if ( !stock ) // add it
        return addToStock(state, action)
      return updateStock(state, action)

    case SET_CAPACITY:
      return Object.assign({}, state, { capacity: action.m3 })

    case INVENTORY_RESET:
      return initialState

    case INVENTORY_INIT:
      return init(state, action)

    case INVENTORY_CLEAR_ITEMS:
      return clearItems(state)
    case INVENTORY_CLEAR_STOCK:
      return clearStock(state)
  }

  return state
}
