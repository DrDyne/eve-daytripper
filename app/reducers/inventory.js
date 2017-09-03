import { PASTED } from '../actions'

export const initialState = {
  items: [],
  stock: [{
    name: 'core probe',
    qty: 8
  }],
}

export const inventory = (state=initialState, action) => {
  switch ( action.type ) {
    case PASTED:
      console.log('>>> inventory:pasted', action.clipboard.getData('Text'))
      return (dispatch, getState) => {
      }
  }

  return state
}
