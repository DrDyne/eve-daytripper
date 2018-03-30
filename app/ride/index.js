import { connect } from 'react-redux'
import { enableRide, disableRide } from 'App/actions/layout'
import Ride from './component'

import { PROFILE_LOAD_END } from 'App/actions/layout'

export const mapStateToProps = ({layout}) => ({
  ready: !layout.profileLoading,
  enabled: !layout.rideFinished,
})

export const mapDispatchToProps = dispatch => ({
  start: () => dispatch(enableRide()),
  exit: () => dispatch(disableRide()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Ride)
