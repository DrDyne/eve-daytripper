import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { gps } from '../../../actions'
import { ControlInputs } from './component'

export const mapStateToProps = state => ({
  search: state.gps.search
})

export const mapDispatchToProps = dispatch => ({
  search: (origin, destination) => dispatch(gps.search(origin, destination))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ControlInputs))
