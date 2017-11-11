import { connect } from 'react-redux'
import { gps } from '../../../actions'
import { ControlInputs } from './component'

export const mapDispatchToProps = dispatch => ({
  search: (origin, destination) => dispatch(gps.search(origin, destination))
})

export default connect(null, mapDispatchToProps)(ControlInputs)
