import { connect } from 'react-redux'
import { SetStockDialog } from './component'
import { setStock } from '../../actions'

export const mapStateToProps = state => state
export const mapDispatchToProps = dispatch => ({
  setStock: ({items=[], qty}) => {
    items.forEach(({id, name}) => {
      dispatch(setStock({id, name, qty}))
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SetStockDialog)
