import { connect } from 'react-redux'
import {
  inputPaste,
  inputPasteDone,
  inventory,
  gps
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  busy: state.history.busy,
  parsedItems: state.history.lastPasted.items.length,
  parsedSystem: state.history.lastOrigin.name,
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))

    inventory.save()

    return dispatch(inventory.updateInventoryFromPaste())
    .then(() => dispatch(gps.createRouteFromPaste()))
    .catch(err => Promise.resolve( console.warn(err) ))
    .then(() => dispatch(inputPasteDone()))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
