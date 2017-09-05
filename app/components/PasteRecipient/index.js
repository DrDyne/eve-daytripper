import { connect } from 'react-redux'
import {
  inputPaste
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  parsedItems: state.history.lastPasted.items.length
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
