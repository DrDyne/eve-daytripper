import React from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import {
  Paper,
  Toolbar,
  Typography,
} from 'material-ui'
import GpsControlInputs from './ControlInputs'
import GpsCloseButton from './CloseButton'
import RoutesToFavorites from './RoutesToFavorites'
import GpsContent from './Content'
import OriginsHistory from './OriginsHistory'
import * as utils from './utils'

export const Gps = props => {
  const {
    routes,
    showShortestRoutes,
    showFavoriteRoutes,
  } = props

  return (<Paper style={{
    marginBottom: 4,
    width: '100%',
  }}>
    <Toolbar style={{
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'stretch',
    }}>
      <GpsControlInputs style={{
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'center',
      }} />
      <Route path="/home/nav" component={GpsCloseButton} />
    </Toolbar>

    <GpsContent />

    { !!showFavoriteRoutes &&
    <Route path="/home/nav/:origin" render={({match}) => (
      <RoutesToFavorites origin={match.params.origin} />
    )} /> }

    <Route path="/home" exact component={OriginsHistory} />

  </Paper>)
}

import {
  Button,
} from 'material-ui'
import { SystemSecAvatar } from '../SystemSecAvatar'
