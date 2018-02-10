import { connect } from 'react-redux'
import { saveProfile } from 'App/actions'
import withTicker from './TickerHOC'
import AutoSaveSpinner from './Spinner'
import AutoSavedNotification from './Notification'

export const mapStateToProps = state => ({
  loading: true//state.layout.loadingProfile
})
export const mapDispatchToProps = dispatch => ({
  saveProfile: () => dispatch(saveProfile())
})

export const Spinner = connect(mapStateToProps, mapDispatchToProps)(withTicker(AutoSaveSpinner))
export const Notification = connect(mapStateToProps, mapDispatchToProps)(withTicker(AutoSavedNotification))

export default {
  Spinner,
  Notification
}
