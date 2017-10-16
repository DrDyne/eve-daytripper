import { connect } from 'react-redux'
import { AppBar } from './component'
import { toggleSettingsMenu } from '../../actions'

const mapStateToProps = ({char}) => ({
  char,
})

const mapDispatchToProps = dispatch => ({
  toggleSettingsMenu: () => {
    dispatch(toggleSettingsMenu())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
