export const CLEAR_CREDENTIALS = 'user:credentials:clear'
export const SAVE_CREDENTIALS = 'user:credentials:save'
export const LOGIN_FAILURE = 'user:login:failure'
export const LOGIN_SUCCESS = 'user:login:success'

export const loginCognito = (username, password) => (dispatch, getState, {api}) => {
  return api.user.login('cognito', username, password)
  .then(token => {
    dispatch(loginSuccess())
    dispatch(saveCredentials(token))
  })
  .catch(err => {
    dispatch(loginFailure(err))
    throw err
  })
}

export const signupCognito = (username, password, {email}) => (dispatch, getState, {api}) => {
  return api.user.signup('cognito', username, password, {email})
}

export const logout = () => (dispatch, getState, {api}) => {
  return api.user.logout()
  .then(() => dispatch(clearCredentials()))
}

export const resetPassword = email => {
  return api.user.resetPassword(email)
}

export const toggleRememberMe = () => (dispatch, getState) => {
}

export const saveCredentials = token => ({ type: SAVE_CREDENTIALS, token })
export const clearCredentials = () => ({ type: CLEAR_CREDENTIALS })
export const loginFailure = error => ({ type: LOGIN_FAILURE, error })
export const loginSuccess = () => ({ type: LOGIN_SUCCESS })
