import { connect } from 'react-redux'
import { InfoDialog } from './component'
import {
  closeInspect
} from '../../actions'

export const mapStateToProps = state => ({
  show: state.layout.showInfoDialog,
  item: state.history.inspect
})

export const mapDispatchToProps = dispatch => ({
  hideDialog: () => dispatch(closeInspect())
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoDialog)
