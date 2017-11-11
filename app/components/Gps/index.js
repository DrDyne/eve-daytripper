import { connect } from 'react-redux'
import { Gps } from './component'

export const mapStateToProps = state => ({
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes,
  showFavoriteRoutes: state.layout.showFavoriteRoutes,
})

export default connect(mapStateToProps)(Gps)
