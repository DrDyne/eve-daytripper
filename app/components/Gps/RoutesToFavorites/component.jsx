import React from 'react'
import {
  Grid
} from 'material-ui'
import RouteCard from '../RouteCard'
import { byName } from '../utils'

export const RoutesToFavorites = props => {
  const { favorites, routes, origin } = props

  return (<Grid container spacing={0}>
    { favorites
      .map(fav => routes.find(byName(origin, fav.name)))
      .filter(route => !!route)
      .map(route => (
        <Grid
          item
          key={`${route.origin.id}-${route.destination.id}`}
        >
          <RouteCard route={route} previewSize={'small'}/>
        </Grid>
      ))
    }
  </Grid>)
}
