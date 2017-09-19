import { connect } from 'react-redux'
import { ShowEmptyStockSwitch } from './component'
import { layout } from 'edt-actions'

export const mapStateToProps = state => ({
  checked: state.layout.showEmptyStock
})

export const mapDispatchToProps = dispatch => ({
  toggleShowEmptyStock: () => {
    dispatch(layout.toggleShowEmptyStock())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmptyStockSwitch)
