import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTheme } from 'mui/styles'

import { Settings } from './component'
//import { toggleSettingsMenu } from '../../actions'
import { layout, clearRouteHistory, changeTab, user } from '../../actions'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  //toggle: () => dispatch(toggleSettingsMenu()),
  toggleSafestShortestRoutes: () => dispatch(layout.toggleSafestShortestRoutes()),
  toggleFavoriteRoutes: () => dispatch(layout.toggleFavoriteRoutes()),
  toggleInventoryVisibility: () => dispatch(layout.toggleInventoryVisibility()),
  toggleFleetVisibility: () => dispatch(layout.toggleFleetVisibility()),
  toggleNavigationVisibility: () => dispatch(layout.toggleNavigationVisibility()),
  clearHistory: () => dispatch(clearRouteHistory()),
  changeTab: index => () => dispatch(changeTab(index)),
  logout: () => dispatch(user.logout())
})

export default withTheme()(withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings)))
