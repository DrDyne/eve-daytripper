import {
  ADD_ITEM,
  INPUT_PASTE,
} from '../../actions'

export const logger = store => next => action => {
  if ( ADD_ITEM === action.type ) {
    console.log(`${ADD_ITEM} x${action.qty} ${action.name}`)
    return next(action)
  }

  if ( INPUT_PASTE === action.type ) {
    const { raw } = action
    const lines = raw.split(/\n/).length
    console.groupCollapsed(`>>> inventory:pasted ${lines} lines`)
    console.info(raw)
    const result = next(action)
    console.groupEnd()
    return result
  }
}
