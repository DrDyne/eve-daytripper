import React from 'react'
import { Route } from 'react-router-dom'
import List, { ListSubheader, ListItem, ListItemText } from 'material-ui/List'
import KSpaceListItem from './KSpaceListItem'
import { Typography } from 'mui'
import { RoutePath } from '../../RoutePath'
import { byName } from '../../utils'

export const Favorites = ({origin, favorites, routes, showShortestRoutes}) => (
  <div>
    <ListSubheader style={{ background: 'white', zIndex: 5 }}> Favorites </ListSubheader>
    { favorites
      .map(fav => routes.find(byName(origin, fav.name)))
      .filter(route => !!route)
      .map(route => {
        const { systems, jumps } = route[showShortestRoutes ? 'shortest' : 'safest']

        return (
            <Route key={`${route.origin.id}-${route.destination.id}`} render={({history}) => (
              <KSpaceListItem
                route={route}
                systems={systems}
                jumps={jumps}
                onClick={() => history.push(`/home/nav/${route.origin.name}/${route.destination.name}`)}
              />
            )} />
        )
      })
    }
  </div>
)
