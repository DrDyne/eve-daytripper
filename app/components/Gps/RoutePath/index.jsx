import { connect } from 'react-redux'

import RoutePath from './component'
import RoutePathDivider from './Divider'

export const mapStateToProps = ({layout}) => ({
  shortestRoute: layout.showShortestRoutes
})

export default connect(mapStateToProps)(RoutePath)

export {
  RoutePathDivider
}
