import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from 'material-ui'
import { RoutePath } from './RoutePath'
import { RoutesToFavorites } from './RoutesToFavorites'
import { DestinationCard } from './DestinationCard'
import { OriginCard } from './OriginCard'
import { ControlInputs } from './ControlInputs'
import { CloseButton as GpsCloseButton } from './CloseButton'
import { ControlInputs as GpsControlInputs } from './ControlInputs'
import * as utils from './utils'

export const Gps = ({match, favorites, routes, origins}) => {
  if ( !routes.length ) return null

  return (<Paper elevation={8} style={{
    marginBottom: 2
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
      <GpsCloseButton />
    </Toolbar>

    <Route path="/home/route/:origin" component={withRouter(({match}) => {
      const { origin } = routes.find(utils.byOriginName(match.params.origin))
      return <OriginCard system={origin} />
    })} />

    <Route exact path="/home/route/:origin/:destination" component={withRouter(({match}) => {
      const { destination } = routes.find(utils.byName(match.params.origin, match.params.destination))
      return <DestinationCard system={destination} />
    })} />

    <Route path="/home/route/:origin"
      component={withRouter(({match}) => (
      <RoutesToFavorites
        favorites={favorites}
        routes={routes}
        origin={match.params.origin} />)
      )}
    />

  <Route path="/home/route/" exact
    component={() => (<OriginsHistory origins={origins}/>)}
  />

  </Paper>)
}

const OriginsHistory = props => {
  const { origins } = props
  return <Toolbar>
    <Typography type="body2">
      {origins.length} origins to display
    </Typography>
  </Toolbar>
}
