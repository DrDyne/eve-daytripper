import { connect } from 'react-redux'
import { RoutesHistory } from './component'
import { layout } from '../../actions'

export const mapStateToProps = state => ({
  routes: state.gps.routes,
  systems: state.history.origins,
  favorites: state.gps.favorites,
  jSpace: state.history.origins.filter(({sec}) => -0.99 === sec),
  kSpace: state.history.origins.filter(({sec}) => -0.99 < sec),

  showShortestRoutes: state.layout.showShortestRoutes,
  showFavoriteRoutes: state.layout.showFavoriteRoutes
})

export default connect(mapStateToProps)(RoutesHistory)
