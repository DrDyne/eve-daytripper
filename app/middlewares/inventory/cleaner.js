import {
  ADD_ITEM,
  INPUT_PASTE,
} from '../../actions'

export const cleaner = store => next => action => {
  const result = next(action)
  // then remove all items with 0 qty
  return result
}
