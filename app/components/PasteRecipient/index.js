import { connect } from 'react-redux'
import {
  inputPaste,
  inputPasteDone,
  inventory,
  gps
} from '../../actions'
import { PasteRecipient } from './component'

export const mapStateToProps = state => ({
  busy: state.layout.gpsBusy,
  parsedItems: null,
  parsedSystem: null,
})

export const mapDispatchToProps = dispatch => ({
  onPaste: event => {
    dispatch(inputPaste(event.clipboardData))

    return dispatch(inventory.updateInventoryFromPaste())
    .then(() => dispatch(gps.createRouteFromPaste()))
    .catch(err => Promise.resolve( console.warn(err) ))
    .then(() => dispatch(inputPasteDone()))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteRecipient)
