import { connect } from 'react-redux'
import { Login } from './component'

export const mapStateToProps = state => state

export default connect(mapStateToProps)(Login)
