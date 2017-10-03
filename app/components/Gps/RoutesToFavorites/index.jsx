import React from 'react'
import {
  Grid
} from 'material-ui'
import RouteCard from '../RouteCard'
import { byName } from '../utils'

export const RoutesToFavorites = props => {
  const { favorites, routes, origin } = props
  console.log(favorites, routes)
  console.log( favorites.map(fav => routes.find(byName(origin, fav.name))).filter(r => !!r) )
  return (<Grid container spacing={8}>
    { favorites.map(fav => routes.find(byName(origin, fav.name)))
      .filter(route => !!route)
      .map(route => <Grid item xs={12} sm={6} md={3} key={`${route.origin.id}-${route.destination.id}`}>
        <RouteCard route={route} />
      </Grid>)
    }
  </Grid>)
}
