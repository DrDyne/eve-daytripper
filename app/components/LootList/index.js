import { connect } from 'react-redux'
import { LootList } from './component'

const mapStateToProps = state => ({
  layout: state.layout,
  items: state.inventory.items.filter(item => {
    return !state.inventory.stock.find(stock => stock.name === item.name)
  })
})

const mapDispatchToProps = dispatch => ({
  action1: () => {},
  action2: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(LootList)
