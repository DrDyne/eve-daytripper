import { connect } from 'react-redux'
import { RouteMenu } from './component'
import {
  gps,
} from '../../../actions'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  addFavorite: system => dispatch(gps.addFavorite(system)),
  deleteFavorite: system => dispatch(gps.deleteFavorite(system)),
  deleteHistory: system => dispatch(gps.deleteHistory(system)),
  deleteRoute: (origin, destination) => event => dispatch(gps.deleteRoute(origin, destination)),
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteMenu)
