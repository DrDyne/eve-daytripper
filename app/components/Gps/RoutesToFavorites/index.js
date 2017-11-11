import { connect } from 'react-redux'
import { RoutesToFavorites } from './component'

export const mapStateToProps = state => ({
  routes: state.gps.routes,
  favorites: state.gps.favorites,
})

export default connect(mapStateToProps)(RoutesToFavorites)
