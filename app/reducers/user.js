import { SAVE_CREDENTIALS } from '../actions'

export const initialState = {
  cognitoId: null,
  token: null,
  expires: null,
  type: 'Bearer'
}

export const user = (state=initialState, action) => {
  if ( SAVE_CREDENTIALS !== action.type ) return state

  const { token, expires } = action
  return Object.assign({}, state, { token, expires })
}
