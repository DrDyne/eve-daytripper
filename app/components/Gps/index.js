import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Gps } from './component'

export const mapStateToProps = state => Object.assign({},
  state.gps,
  { layout: state.layout },
  { origins: state.history.origins },
)

export const mapDispatchToProps = dispatch => ({
  setFavorite: system => { },
  setAvoidance: system => { },
  deleteRoute: route => { },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gps))
