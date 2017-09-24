import { connect } from 'react-redux'
import {
  inputPaste,
  inventory,
  clearMissingFromPaste,
  saveInventory,
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  parsedItems: state.history.lastPasted.items.length
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))
    dispatch(inventory.save())
    dispatch(inventory.updateInventoryFromPaste())
  },
  clearMissing: event => {
    console.log('clear missing')
    dispatch(clearMissingFromPaste())
  },
  sellMissing: event => {
    console.log('sell missing')
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
