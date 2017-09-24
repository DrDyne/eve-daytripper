import { connect } from 'react-redux'
import { PasteActions } from './component'
import { inventory } from '../../actions'

export const mapStateToProps = ({inventory, history}) => ({
  show: (history.paste.length > 0) &&
    (inventory.total.m3 !== history.lastInventory.total.m3)
})

export const mapDispatchToProps = dispatch => ({
  clearMissing: () => {
    dispatch(inventory.clearMissingItemsAfterPaste())
  },
  sellMissing: () => {
    dispatch(inventory.sellMissingItemsAfterPaste())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PasteActions)
