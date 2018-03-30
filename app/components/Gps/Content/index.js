import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Content } from './component'

export const mapStateToProps = state => ({
  origins: state.history.origins,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes,
  showFavoriteRoutes: state.layout.showFavoriteRoutes
})

export default withRouter(connect(mapStateToProps)(Content))
