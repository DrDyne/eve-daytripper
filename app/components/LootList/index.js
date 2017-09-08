import { connect } from 'react-redux'
import { LootList } from './component'

const mapStateToProps = ({layout, inventory, history}) => ({
  layout,
  inventory,
  lootOnly: inventory.items.filter(item => {
    return !inventory.stock.find(stock => stock.name === item.name)
  }),
  history,
})

const mapDispatchToProps = dispatch => ({
  action1: () => {},
  action2: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(LootList)
