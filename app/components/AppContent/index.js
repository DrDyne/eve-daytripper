import { connect } from 'react-redux'
import { changeTab, loadProfile } from '../../actions'
import { AppContent } from './component'

const mapStateToProps = state => ({
  layout: state.layout,
  activeTab: state.activeTab,
})

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(loadProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContent)
