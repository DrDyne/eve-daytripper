import { connect } from 'react-redux'
import { LootList } from './component'
const mapStateToProps = state => state

export connect(mapStateToProps)(LootList)
