import React from 'react'
import Paper from 'material-ui/Paper'
import { RoutePath, RoutePathDivider } from '../RoutePath'
import { DestinationCard } from '../DestinationCard'

export const RoutePathAndDestination = ({route, systems}) => (
  <div style={{flex: '2 1 auto'}}>
    <div style={{
      display: 'flex',
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
        <RoutePathDivider style={{display: 'flex', flexGrow: 1, marginTop: -62}} />
        <RoutePath systems={systems} />
        <RoutePathDivider style={{display: 'flex', flexGrow: 1, marginTop: -62}} />
      </Paper>
      <DestinationCard system={route.destination} />
    </div>

  </div>
)

export default RoutePathAndDestination
