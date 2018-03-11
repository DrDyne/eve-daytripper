import { connect } from 'react-redux'
import { OriginCard } from './component'
import { deleteHistory } from 'App/actions/gps'
import { withTheme } from 'mui/styles'

const mapDispatchToProps = dispatch => ({
  deleteFromHistory: system => event => dispatch(deleteHistory(system))
})

export default withTheme()(connect(null, mapDispatchToProps)(OriginCard))
