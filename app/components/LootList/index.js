import { connect } from 'react-redux'
import { LootList } from './component'

const mapStateToProps = state => ({
  layout: state.layout,
  items: []
})
const mapDispatchToProps = dispatch => ({
  action1: () => {},
  action2: () => {}
})

export default connect(mapStateToProps, mapDispatchToProps)(LootList)
