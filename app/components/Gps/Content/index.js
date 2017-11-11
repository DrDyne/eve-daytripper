import { connect } from 'react-redux'
import { Content } from './component'

export const mapStateToProps = state => ({
  origins: state.history.origins,
  routes: state.gps.routes,
  showShortestRoutes: state.layout.showShortestRoutes,
})

export default connect(mapStateToProps)(Content)
