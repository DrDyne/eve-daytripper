import React from 'react'
import { Route } from 'react-router-dom'
import List, { ListSubheader, ListItem, ListItemText } from 'mui/List'
import KSpaceListItem from './KSpaceListItem'
import { byName } from '../../utils'

export const Routes = ({origin, favorites, routes, showShortestRoutes}) => (
  <div>
    <ListSubheader style={{ background: 'white', zIndex: 5 }}> Routes </ListSubheader>
    { routes
      .filter(route => route.origin.name === origin)
      .filter(route =>
        !favorites.find(fav => fav.name === route.destination.name)
      )
      .sort((a, b) => a.destination.name.localeCompare(b.destination.name))
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
