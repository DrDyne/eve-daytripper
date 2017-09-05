import {
  ADD_ITEM,
  INPUT_PASTE,
  SET_STOCK,
} from '../../actions'

export const logger = store => next => action => {
  if ( ADD_ITEM === action.type ) {
    const qtyLabel = (action.qty > 0) ? '+' : '-'
    console.groupCollapsed(`${ADD_ITEM}: ${qtyLabel}${action.qty} ${action.name}`)
    return next(action)
  }

  if ( INPUT_PASTE === action.type ) {
    const text = action.clipboard.getData('Texte')
    console.log(`>>> inventory:pasted "${text}"`)
    console.log(`pasted ${text.split(/\n/).length} lines`)

    const itemsBefore = store.getState().inventory.items.length
    const result = next(action)
    const itemsAfter = store.getState().inventory.items.length

    if ( itemsBefore > itemsAfter )
      console.log(`-${itemsBefore-itemsAfter} items`)
    if ( itemsBefore < itemsAfter )
      console.log(`+${itemsAfter-itemsBefore} items`)
    console.log(`${itemsAfter} items`)

    return result
  }
}
