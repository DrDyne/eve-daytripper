import { connect } from 'react-redux'
import {
  inputPaste,
  inputPasteDone,
  inventory,
  gps
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  busy: state.layout.gpsBusy || state.layout.inventoryBusy,
  items: state.history.lastPasted.items,
  system: state.history.origins.find(o => o.name.toUpperCase() === state.history.lastPasted.raw.toUpperCase()),
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))

    return dispatch(inventory.updateInventoryFromPaste())
    .then(() => dispatch(gps.identifySystemFromPaste()))
    .catch(err => Promise.resolve( console.warn(err) ))
    .then(() => dispatch(inputPasteDone()))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
