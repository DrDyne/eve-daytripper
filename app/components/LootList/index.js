import { connect } from 'react-redux'
import { LootList } from './component'
import { inventory } from 'App/actions'

const mapStateToProps = ({layout, inventory, history}) => ({
  layout,
  inventory,
  lootOnly: inventory.items.filter(item => {
    return !inventory.stock.find(stock => stock.name === item.name)
  }),
  history,
})

const mapDispatchToProps = dispatch => ({
  emptyInventory: () => dispatch(inventory.clearLoot())
})

export default connect(mapStateToProps, mapDispatchToProps)(LootList)
