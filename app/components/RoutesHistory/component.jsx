import React from 'react'
import {
  Button,
  IconButton,
  Typography
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { Link } from 'react-router-dom'
import { SystemSecAvatar } from '../SystemSecAvatar'
import RouteMenu from './RouteMenu'

export const RoutesHistory = props => {
  const { routes, showShortestRoutes } = props
  const { history } = props // router history

  return (<div style={{
    width: '100%',
  }}>
  {/*}
  // check sticky subheaders "Pinned Subheader List"
  // https://material-ui-1dab0.firebaseapp.com/demos/lists/
  */}
    <ListSubheader style={{
      background: 'white'
    }}>
      J-space
    </ListSubheader>
    <WormholeHistoryListItems {...props} />

    <ListSubheader style={{
      background: 'white'
    }}>
      K-space
    </ListSubheader>
    <RoutesHistoryListItems {...props} />

    <ListSubheader style={{
      background: 'white'
    }}>
      Favorites
    </ListSubheader>
    <FavoriteHistoryListItems {...props} />
  </div>)
}

export const RoutesHistoryListItems = props => {
  const { routes, showShortestRoutes } = props
  const { history } = props // router history

  return (<div>
    { routes.map(route => {
      const { origin, destination } = route
      const { jumps } = route[showShortestRoutes ? 'shortest' : 'safest']
      const url = route.isFavorite
      ? `/home/nav/${origin.name}`
      : `/home/nav/${origin.name}/${destination.name}`

      return (<Link to={url} key={`route-history-${origin.id}-${destination.id}`}>
        <ListItem
          button
          style={{
            textDecoration: 'none'
        }}>

          <ListItemText
            primary={origin.name}
            secondary={ <span> <SystemSecAvatar system={origin} /> {origin.sec.toFixed(2)} </span> }
          />

          { !route.isFavorite && <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignSelf: 'flex-start',
              }}>
              <ListItemText primary={`/ ${jumps} /`} secondary="jumps" />
            </div>
          }

          { !route.isFavorite && <ListItemText
            primary={destination.name}
            secondary={<span> <SystemSecAvatar system={destination} /> {destination.sec.toFixed(2)} </span> }
          /> }

          <ListItemSecondaryAction>
            <RouteMenu route={route} />
          </ListItemSecondaryAction>
        </ListItem>
      </Link>)
    })
    .filter(link => !!link) }
  </div>)
}

export const WormholeHistoryListItems = props => {
  const { wormholes } = props
  const { history } = props // router

  return (<div>
    { wormholes.map(j => {
      return (<Link to={`/home/nav/${j.name}`} key={`route-history-wormhole-${j.id}`}>
        <ListItem
          button
          style={{
            textDecoration: 'none'
        }}>

          <ListItemText
            primary={j.name}
            secondary={ <span> <SystemSecAvatar system={j} /> {j.sec.toFixed(2)} </span> }
          />
        </ListItem>
      </Link>)
    }) }

  </div>)
}

export const FavoriteHistoryListItems = props => {
  const { favorites } = props

  return (<div>
    { favorites.map(system => {
      return (<ListItem
        button
        key={`route-history-favorite-${system.id}`}
        style={{
          textDecoration: 'none'
      }}>

        <ListItemText
          primary={system.name}
          secondary={ <span> <SystemSecAvatar system={system} /> {system.sec.toFixed(2)} </span> }
        />
      </ListItem>)
    })}
  </div>)
}
