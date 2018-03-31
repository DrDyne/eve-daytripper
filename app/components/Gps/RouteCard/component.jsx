import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from 'material-ui'
import RoutePath from '../RoutePath'
import RouteMenu from '../RouteMenu'
import * as utils from '../utils'

export const RouteCard = ({showShortestRoutes, route, favorites, previewSize}) => {
  const { systems, jumps } = route[showShortestRoutes ? 'shortest' : 'safest']
  return (<Card elevation={0} style={{border: '1px solid #eee'}}>
  <CardContent style={{
    paddingBottom: 0,
    paddingTop: 8
  }}>
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eee',
    }}>
      { favorites.find(fav => fav === route.origin.name) &&
        <Typography type="subheading">
          route.origin.name
        </Typography>
      }

      <Typography type="subheading">
        {jumps}
      </Typography>

      <Typography type="subheading">
        {route.destination.name}
      </Typography>
    </div>

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Typography type="caption" style={{marginBottom: 6}}> { route.origin.name} </Typography>
      <RoutePath systems={systems} previewSize={previewSize}/>
    </div>
  </CardContent>
</Card>) }
