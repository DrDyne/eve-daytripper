import { connect } from 'react-redux'
import { Fleet } from './component'
import * as actions from '../../actions/fleet'

export const mapStateToProps = state => ({
  members: state.fleet.members
})

export default connect(mapStateToProps)(Fleet)
