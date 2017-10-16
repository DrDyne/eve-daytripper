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
  deleteFromHistory: origin => dispatch(deleteRouteByOrigin(origin)),
  openMenu: route => () => console.log('open menu', route)
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteMenu)
