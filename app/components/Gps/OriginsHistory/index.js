import { connect } from 'react-redux'
import { OriginsHistory } from './component'
import { skipOriginsHistory } from 'App/actions/layout'
import { withTheme } from 'mui/styles'

export const mapStateToProps = state => ({
  origins: state.history.origins.slice(state.layout.skipOriginsHistory)
})

export const mapDispatchToProps = dispatch => ({
  skipOrigins: () => dispatch(skipOriginsHistory())
})

export default withTheme()(connect(mapStateToProps, mapDispatchToProps)(OriginsHistory))
