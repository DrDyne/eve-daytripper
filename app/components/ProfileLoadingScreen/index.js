import { connect } from 'react-redux'
import { ProfileLoadingScreen } from './component'

export const mapStateToProps = state => ({
  show: state.layout.profileLoading || true
})

export default connect(mapStateToProps)(ProfileLoadingScreen)
