import React from 'react'
import { Route } from 'react-router-dom'
import {
  Button,
  Divider,
  Paper,
  Toolbar,
} from 'material-ui'
import { RoutePath } from '../RoutePath'
import OriginCard from '../OriginCard'
import { DestinationCard } from '../DestinationCard'
import * as utils from '../utils'

export const Content = props => {
  const {
    origins,
    routes,
    showShortestRoutes,
  } = props

  return (<div>
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

        const { systems } = route[showShortestRoutes ? 'shortest' : 'safest']

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
      const { jumps } = route[showShortestRoutes ? 'shortest' : 'safest']
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

        <Button raised color="primary" href={`http://evemaps.dotlan.net/route/${origin.name}:${destination.name}`} target="_blank">
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
  </div>)
}
