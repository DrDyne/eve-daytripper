import { connect } from 'react-redux'
import { StockList } from './component'

export const mapStateToProps = ({layout, inventory}) => ({
  layout,
  inventory
})

export const mapDispatchToProps = dispatch => ({
  showMenu: item => () => {
    console.log('showMenu', item)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(StockList)
