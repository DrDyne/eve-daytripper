import { connect } from 'react-redux'
import { RouteCard } from './component'

export const mapStateToProps = state => ({
  showShortestRoutes: state.layout.showShortestRoutes,
  favorites: state.gps.favorites,
})

export default connect(mapStateToProps)(RouteCard)
