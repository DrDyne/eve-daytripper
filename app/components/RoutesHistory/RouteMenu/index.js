import { connect } from 'react-redux'
import { RouteMenu } from './component'
import {
  gps,
  deleteRouteByOrigin,
} from '../../../actions'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  addFavorite: system => dispatch(gps.addFavorite(system)),
  deleteFavorite: system => dispatch(gps.deleteFavorite(system)),
  //deleteFromHistory: system => event => dispatch(deleteFromHistory(system)),
  deleteRoute: (origin, destination) => event => dispatch(gps.deleteRoute(origin, destination)),
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteMenu)
