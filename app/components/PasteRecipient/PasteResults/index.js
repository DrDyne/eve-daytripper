import { connect } from 'react-redux'
import { PasteResults } from './component'

export const mapStateToProps = ({history}) => ({
  lastPasted: history.lastPasted,
  origins: history.origins
})

export default connect(mapStateToProps)(PasteResults)
