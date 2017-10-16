import {
  ADD_ITEM,
  INPUT_PASTE,
} from '../../actions'

export const logger = store => next => action => {
  switch ( action.type ) {
    case ADD_ITEM:
      console.log(`${ADD_ITEM} x${action.qty} ${action.name}`)
      return next(action)

    case INPUT_PASTE:
      const { raw } = action
      const lines = raw.split(/\n/).length
      console.groupCollapsed(`>>> inventory:pasted ${lines} lines`)
      console.info(raw)
      const result = next(action)
      console.groupEnd()
      return result
  }

  return next(action)
}
