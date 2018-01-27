import { connect } from 'react-redux'
import { OriginCard } from './component'
import { deleteHistory } from 'App/actions/gps'

const mapDispatchToProps = dispatch => ({
  deleteFromHistory: system => event => dispatch(deleteHistory(system))
})

export default connect(null, mapDispatchToProps)(OriginCard)
