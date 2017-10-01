import { connect } from 'react-redux'
import { RoutesHistory } from './component'

export const mapStateToProps = state => ({
  routes: state.history.routes
})

export const mapDispatchToProps = dispatch => ({
  deleteRoute: route => {
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutesHistory)
