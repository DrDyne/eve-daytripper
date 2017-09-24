import { connect } from 'react-redux'
import {
  showInfoDialog,
} from '../../actions'
import { InfoButton } from './component'

export const mapStateToProps = state => ({
  dialogContent: state.history.inspect
})

export const mapDispatchToProps = dispatch => ({
  showInfoDialog: item => event => {
    dispatch(showInfoDialog(item))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoButton)
