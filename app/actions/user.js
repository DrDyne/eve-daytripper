export const SAVE_CREDENTIALS = 'user:credentials:save'

export const loginCognito = (username, password) => (dispatch, getState, {api}) => {
  return api.user.login('cognito', username, password)
  .then(token => {
    dispatch(saveCredentials(token))
  })
}

export const signupCognito = (username, password, {email}) => (dispatch, getState, {api}) => {
  return api.user.signup('cognito', username, password, {email})
}

export const resetPassword = email => {
  return api.user.resetPassword(email)
}

export const toggleRememberMe = () => (dispatch, getState) => {
}

export const saveCredentials = token => ({ type: SAVE_CREDENTIALS, token })
