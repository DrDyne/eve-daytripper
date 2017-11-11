import { connect } from 'react-redux'
import { OriginsHistory } from './component'

export const mapStateToProps = state => ({
  origins: state.history.origins
})

export default connect(mapStateToProps)(OriginsHistory)
