import { connect } from 'react-redux'
import { ProfileLoadingScreen } from './component'

export const mapStateToProps = state => ({
  show: state.layout.profileLoading,
  profile: state.fleet.members[0],
})

export default connect(mapStateToProps)(ProfileLoadingScreen)
