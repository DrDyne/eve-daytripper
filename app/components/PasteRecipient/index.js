import { connect } from 'react-redux'
import { pasted } from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(pasted(event.clipboardData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
