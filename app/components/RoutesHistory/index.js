import { connect } from 'react-redux'
import { RoutesHistory } from './component'

export const mapStateToProps = state => ({
  origins: state.history.origins,
  routes: state.gps.routes,
})

export const mapDispatchToProps = dispatch => ({
  setFavorite: system => { },
  setAvoidance: system => { },
  deleteRoute: route => { },
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutesHistory)
