import React from 'react'
import {
  Button,
  IconButton,
  Typography
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { NavLink } from 'react-router-dom'
import { SystemSecAvatar } from '../SystemSecAvatar'
import RouteMenu from './RouteMenu'

export const RoutesHistory = props => {
  const { routes } = props
  const { history } = props // router history

  return (<div style={{
    width: '100%',
  }}>
    { routes.map(route => {
      const { origin, destination } = route
      const shortSec = origin.sec.toFixed(2)
      const url = route.isFavorite
      ? `/home/route/${origin.name}`
      : `/home/route/${origin.name}/${destination.name}`

      return (<ListItem
        button
        onClick={() => {
          history.push(url)
        }}
        key={`route-history-${origin.id}-${destination.id}`}
        style={{
          textDecoration: 'none'
      }}>

        <ListItemText
          primary={origin.name}
          secondary={ <div> <SystemSecAvatar system={origin} /> {origin.sec.toFixed(2)} </div> }
        />

        { !route.isFavorite && <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignSelf: 'flex-start',
            }}>
            <ListItemText primary={`/ ${route.jumps} /`} secondary="jumps" />
          </div>
        }

        { !route.isFavorite && <ListItemText
          primary={destination.name}
          secondary={<div> <SystemSecAvatar system={destination} /> {destination.sec.toFixed(2)} </div> }
        /> }

        <ListItemSecondaryAction>
          <RouteMenu route={route} />
        </ListItemSecondaryAction>
      </ListItem>)
    })
    .filter(link => !!link) }
  </div>)
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
}
