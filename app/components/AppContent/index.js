import { connect } from 'react-redux'
import { changeTab } from '../../actions'
import { AppContent } from './component'

const mapStateToProps = state => ({
  layout: state.layout
})
const mapDispatchToProps = dispatch => ({
  notifyChangeTab: (event, tab) => {
    dispatch(changeTab(tab))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContent)
