import { connect } from 'react-redux'
import { changeTab } from '../../actions'
import { AppContent } from './component'

const mapStateToProps = state => ({
  layout: state.layout,
  activeTab: state.activeTab,
})

export default connect(mapStateToProps)(AppContent)
