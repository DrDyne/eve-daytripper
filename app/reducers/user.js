import {
  CLEAR_CREDENTIALS,
  SAVE_CREDENTIALS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
} from '../actions/user'

export const initialState = {
  Authorization: null,
  loginError: null
}

export const user = (state=initialState, action) => {
  switch (action.type) {
    case CLEAR_CREDENTIALS:
      return Object.assign({}, state, { Authorization: null })
    case SAVE_CREDENTIALS:
      return Object.assign({}, state, { Authorization: action.token })

    case LOGIN_FAILURE:
      return Object.assign({}, state, { loginError: action.error })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loginError: null })
      
    case SIGNUP_FAILURE:
      return Object.assign({}, state, { signupError: action.error })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, { signupError: null })
  }

  return state

}
