import { connect } from 'react-redux'
import { Header } from './component'
import { setCapacity } from '../../../actions'
import { inventory } from '../../../actions'

export const mapStateToProps = state => ({
  inventory: state.inventory,
  history: state.history
})

export const mapDispatchToProps = dispatch => ({
  setCapacity: event => {
    const value = parseInt(event.target.value)
    const [min, max] = [5, 9999999]
    if ( !Number.isInteger(value) ) return
    if ( value < min ) return dispatch(setCapacity(min))
    if ( value > max ) return dispatch(setCapacity(max))

    return dispatch(setCapacity(value))
  },
  clearMissing: event => {
    dispatch(inventory.save())
    dispatch(inventory.clearMissingItemsAfterPaste())
  },
  sellMissing: event => {
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
