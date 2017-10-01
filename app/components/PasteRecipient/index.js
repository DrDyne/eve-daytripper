import { connect } from 'react-redux'
import {
  inputPaste,
  inventory,
  gps
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  parsedItems: state.history.lastPasted.items.length,
  parsedSystem: state.history.lastOrigin.name,
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))
    dispatch(inventory.save())
    dispatch(inventory.updateInventoryFromPaste())
    dispatch(gps.createRouteFromPaste())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
