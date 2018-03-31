import { connect } from 'react-redux'
import { search, identifySystem } from 'App/actions/gps'
import { ControlInputs } from './component'

export const mapDispatchToProps = dispatch => ({
  search: (origin, destination) => dispatch(search(origin, destination)),
  identify: name => dispatch(identifySystem(name))
})

export default connect(null, mapDispatchToProps)(ControlInputs)
