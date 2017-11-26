import { connect } from 'react-redux'
import { Login } from './component'
import { user } from '../../actions'

export const mapStateToProps = state => ({
  loginError: state.user.loginError,
  signupError: state.user.signupError
})

export const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(user.loginCognito(username, password)),
  signup: (username, password, optional) => dispatch(user.signupCognito(username, password, optional)),
  toggleRememberMe: () => dispatch(user.toggleRememberMe()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
