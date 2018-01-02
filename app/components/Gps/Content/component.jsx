import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Button,
  Divider,
  List,
  Toolbar,
} from 'mui'
import { ListSubheader } from 'mui/List'
import OriginCard from '../OriginCard'
import RoutePathAndDestination from './RoutePathAndDestination'
import { KSpaceActivity, KSpaceRoutes, KSpaceFavorites } from './KSpace'
import { WormholeEffect, WormholeStatics } from './JSpace'

import * as utils from '../utils'


export const Content = ({origins, routes, showShortestRoutes, showFavoriteRoutes}) => (
  <Route path="/home/nav" render={() => (
    <Toolbar style={{
      borderTop: '1px solid #eee',
      alignItems: 'start'
    }}>
      <Route path="/home/nav/:origin" render={({match}) => {
        const origin = origins.find(({name}) => name === match.params.origin)
        return origin ? <OriginCard system={origin} /> : null
      }} />

      <Switch>

        <Route path="/home/nav/:origin/:destination" render={({match}) => {
          const route = routes.find(utils.byName(match.params.origin, match.params.destination))
          if ( !route ) return null

          const { systems } = route[showShortestRoutes ? 'shortest' : 'safest']

          return (<RoutePathAndDestination route={route} systems={systems} />)
        }} />

        <Route path="/home/nav/:origin" render={({match}) => {
          const origin = origins.find(({name}) => name === match.params.origin)
          if ( !origin ) return null
          if ( !origin.wh ) return ( // return jumps/kills/etc
            <List style={{flex: '2 1 auto'}}>
              <KSpaceActivity system={origin} />

              <KSpaceRoutes origin={origin.name} />

              { showFavoriteRoutes && (
                <KSpaceFavorites origin={origin.name} />
              )}

            </List>
          )

          return (
            <div style={{
              flex: '2 1 auto',
            }}>

              { origin.effectName &&
                <WormholeEffect system={origin} />
              }

              <WormholeStatics system={origin} />

            </div>
          )
        }} />

      </Switch>
    </Toolbar>
  )} />
)
