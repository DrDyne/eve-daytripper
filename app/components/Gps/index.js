import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Gps } from './component'

export const mapStateToProps = state => state.gps

export const mapDispatchToProps = dispatch => ({
  setFavorite: system => { },
  setAvoidance: system => { },
  deleteRoute: route => { },
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gps))
