import { connect } from 'react-redux'
import { AppBar } from './component'
import { toggleSettingsMenu } from '../../actions'

const mapDispatchToProps = dispatch => ({
  toggleSettingsMenu: () => {
    dispatch(toggleSettingsMenu())
  }
})

export default connect(null, mapDispatchToProps)(AppBar)
