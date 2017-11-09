import {
  SAVE_CREDENTIALS
} from '../actions/user'

export const initialState = {
  Authorization: null
}

export const user = (state=initialState, action) => {
  if ( SAVE_CREDENTIALS !== action.type ) return state

  return Object.assign({}, state, { Authorization: action.token })
}
