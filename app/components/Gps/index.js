import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Gps } from './component'

export default withRouter(connect()(Gps))
