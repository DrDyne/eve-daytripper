import { connect } from 'react-redux'
import { Settings } from './component'
//import { toggleSettingsMenu } from '../../actions'
import { layout, clearRouteHistory } from '../../actions'

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  //toggle: () => dispatch(toggleSettingsMenu()),
  toggleSafestShortestRoutes: () => {
    console.log('toggle shortest/safest routes')
  },
  toggleFavoriteRoutes: () => dispatch(layout.toggleFavoriteRoutes()),
  clearHistory: () => {
    dispatch(clearRouteHistory())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
