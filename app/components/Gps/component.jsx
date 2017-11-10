import React from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import {
  Divider,
  Paper,
  Toolbar,
  Typography,
} from 'material-ui'
import { RoutePath } from './RoutePath'
import { RoutesToFavorites } from './RoutesToFavorites'
import { DestinationCard } from './DestinationCard'
import { ControlInputs } from './ControlInputs'
import { CloseButton as GpsCloseButton } from './CloseButton'
import GpsControlInputs from './ControlInputs'
import OriginCard from './OriginCard'
import * as utils from './utils'

export const Gps = props => {
  const { match, favorites, routes, origins, layout } = props

  return (<Paper style={{
    marginBottom: 2,
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

    <div style={{
      display: 'flex',
      justifyContent: 'flex-start'
    }}>
      <Route path="/home/nav/:origin" render={({match}) => {
        const origin = origins.find(({name}) => name === match.params.origin)
        return origin ? <OriginCard system={origin} /> : null
      }} />

      <Route exact path="/home/nav/:origin" render={({match}) => {
        const origin = origins.find(({name}) => name === match.params.origin)
        return origin ? (<div style={{
          display: 'flex',
          alignSelf: 'flex-end',
        }}>
          <Button href={`http://evemaps.dotlan.net/system/${origin.name}`} target="_blank">
            dotlan
          </Button>

          <Button href={`https://zkillboard.com/system/${origin.id}/`} target="_blank">
            zkill
          </Button>
        </div>) : null
      }} />

      <Route exact path="/home/nav/:origin/:destination" render={({match}) => {
        const route = routes.find(utils.byName(match.params.origin, match.params.destination))
        if ( !route ) return null

        const { systems } = route[layout.showShortestRoutes ? 'shortest' : 'safest']

        return (<div style={{flex: '1 1 auto'}}>
          <div style={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'row',
          }}>
            <Paper
              elevation={0}
              style={{
                display: 'flex',
                flexGrow: 1,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
              <Divider style={{display: 'flex', flexGrow: 1}} />
              <RoutePath systems={systems} />
              <Divider style={{display: 'flex', flexGrow: 1}} />
            </Paper>
            <DestinationCard system={route.destination} route={route} />
          </div>

        </div>)
      }} />
    </div>

    <Route exact path="/home/nav/:origin/:destination" render={({match}) => {
      const route = routes.find(utils.byName(match.params.origin, match.params.destination))
      if ( !route ) return null
      const { jumps } = route[layout.showShortestRoutes ? 'shortest' : 'safest']
      const { origin, destination } = route

      return (<Toolbar
        disableGutters
        style={{
          flex: '1 1 auto',
          justifyContent: 'space-between'
        }}>
        <div>
          <Button href={`http://evemaps.dotlan.net/system/${origin.name}`} target="_blank">
            dotlan
          </Button>

          <Button href={`https://zkillboard.com/system/${origin.id}/`} target="_blank">
            zkill
          </Button>
        </div>

        <Button href={`http://evemaps.dotlan.net/route/${origin.name}:${destination.name}`} target="_blank">
          route ({jumps})
        </Button>

        <div>
          <Button href={`http://evemaps.dotlan.net/system/${destination.name}`} target="_blank">
            dotlan
          </Button>

          <Button href={`https://zkillboard.com/system/${destination.id}/`} target="_blank">
            zkill
          </Button>
        </div>
      </Toolbar>) }} />


    { !!layout.showFavoriteRoutes &&
    <Route path="/home/nav/:origin" render={({match}) => (
      <RoutesToFavorites favorites={favorites} routes={routes} origin={match.params.origin} />
    )} /> }

    <Route path="/home" exact render={() => (<OriginsHistory origins={origins}/>)} />

  </Paper>)
}

import {
  Button,
} from 'material-ui'
import { SystemSecAvatar } from '../SystemSecAvatar'

const OriginsHistory = props => {
  const { origins } = props

  return (<Toolbar>
    { origins.slice(-6).reverse().map(origin => (
      <Link key={origin.id} to={`/home/nav/${origin.name}`}>
        <Button>
          <SystemSecAvatar system={origin} />
          {origin.name}
        </Button>
      </Link>
    )) }

    { origins.length > 6 && <Typography type="caption"> ... </Typography> }
    <Typography type="caption"> total: {origins.length} </Typography>
  </Toolbar>)
}
