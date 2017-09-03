import { connect } from 'react-redux'
import { Settings } from './component'
import { toggleSettingsMenu } from '../../actions'

const mapStateToProps = state => ({
  open: state.layout.settingsMenuOpen
})

const mapDispatchToProps = dispatch => ({
  toggle: () => {
    dispatch(toggleSettingsMenu())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
