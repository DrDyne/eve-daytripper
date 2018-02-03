import { connect } from 'react-redux'
import { ProfileLoadingScreen } from './component'

export const mapStateToProps = state => ({
  show: state.layout.profileLoading,
  profile: state.fleet.members.find(m => m.id === state.fleet.commander),
})

export default connect(mapStateToProps)(ProfileLoadingScreen)
