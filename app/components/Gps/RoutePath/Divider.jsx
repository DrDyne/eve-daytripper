import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import { LinearProgress } from 'material-ui/Progress'

export const mapStateToProps = state => ({
  showAnimation: true //state.layout.showGpsRouteAnimation // TODO
})

export const RoutePathDivider = ({style, showAnimation}) => (
  showAnimation
  ? (<LinearProgress
      mode="indeterminate"
      style={{
        height: 1,
        width: '100%',
        marginTop: -62,
      }}
    />)
  : (<Divider style={{display: 'flex', flexGrow: 1, marginTop: -62}} />)
)

export default connect(mapStateToProps)(RoutePathDivider)
