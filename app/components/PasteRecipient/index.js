import { connect } from 'react-redux'
import {
  inputPaste,
  updateInventoryFromPaste
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  parsedItems: state.history.lastPasted.items.length
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))
    dispatch(updateInventoryFromPaste())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
