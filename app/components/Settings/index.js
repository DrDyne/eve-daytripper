import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Settings } from './component'
//import { toggleSettingsMenu } from '../../actions'
import { layout, clearRouteHistory, changeTab } from '../../actions'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  //toggle: () => dispatch(toggleSettingsMenu()),
  toggleSafestShortestRoutes: () => dispatch(layout.toggleSafestShortestRoutes()),
  toggleFavoriteRoutes: () => dispatch(layout.toggleFavoriteRoutes()),
  clearHistory: () => dispatch(clearRouteHistory()),
  changeTab: index => () => dispatch(changeTab(index))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings))
