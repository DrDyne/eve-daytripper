import { connect } from 'react-redux'
import { StockList } from './component'

export const mapStateToProps = ({layout, inventory}) => ({
  layout,
  items: inventory.items,
  stock: inventory.stock
})

export const mapDispatchToProps = dispatch => ({
  showMenu: item => () => {
    console.log('showMenu', item)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StockList)
