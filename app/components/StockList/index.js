import { connect } from 'react-redux'
import { StockList } from './component'

export const mapStateToProps = state => ({
  layout: state.layout,
  items: []
})
export const mapDispatchToProps = dispatch => ({
  action1: () => {},
  action2: () => {}
})
export default connect(mapStateToProps, mapDispatchToProps)(StockList)
