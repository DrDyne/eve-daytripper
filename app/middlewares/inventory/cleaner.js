import {
  ADD_ITEM,
  INPUT_PASTE,
} from '../../actions'

export const cleaner = store => next => action => {
  if ( INPUT_PASTE ) {
    const result = next(action)
    // then remove all items with 0 qty
  }
}
