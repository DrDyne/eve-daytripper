import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from 'material-ui'
import { RoutePath } from '../RoutePath'
import RouteMenu from '../RouteMenu'
import * as utils from '../utils'

export const RouteCard = ({showShortestRoutes, route, favorites}) => {
  const { systems, jumps } = route[showShortestRoutes ? 'shortest' : 'safest']
  return <Card>
  <CardContent>
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }}>
      { favorites.find(fav => fav === route.origin.name) &&
        <Typography type="headline" component="h2">
          route.origin.name
        </Typography>
      }

      <Typography type="headline" component="h2">
        {jumps}
      </Typography>

      <Typography type="headline" component="h2">
        {route.destination.name}
      </Typography>
    </div>

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Typography type="caption" style={{marginBottom: 6}}> { route.origin.name} </Typography>
      <RoutePath systems={systems} />
      <Typography type="caption" style={{textAlign: 'right'}}> { route.destination.name} </Typography>
    </div>
  </CardContent>
  <CardActions>
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }}>
      <Button style={{display: 'flex'}}
        href={`http://evemaps.dotlan.net/route/${route.origin.name}:${route.destination.name}`} target="_blank">
          route
      </Button>

      <RouteMenu route={route} />
    </div>
  </CardActions>
</Card> }
