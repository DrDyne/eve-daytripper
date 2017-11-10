import React from 'react'
import { Route } from 'react-router-dom'
import {
  Avatar,
  Button,
  IconButton,
  Typography
} from 'material-ui'
import MoreVert from 'material-ui-icons/MoreVert'
import ListSubheader from 'material-ui/List/ListSubheader'
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import { Link } from 'react-router-dom'
import { SystemSecAvatar, SystemSecAvatarBig } from '../SystemSecAvatar'
import RouteMenu from './RouteMenu'

export const RoutesHistory = props => {
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

const KSpaceSubHeader = ({letter}) => {
  return (<ListSubheader
    style={{
      textAlign: 'right'
    }} >
    { letter }
  </ListSubheader>)
}

const KSpaceRoutes = props => {
  const {
    favorites,
    routes,
    showShortestRoutes,
    showFavoriteRoutes,
  } = props

  const origins = routes.reduce((memo, {origin}) => {
    return memo.find(m => m === origin.name)
    ? memo
    : memo.concat(origin.name)
  }, []).sort()

  const byOrigin = origin => route => route.origin.name === origin
  const leadsToFavorite = route => favorites.find(f => f.id === route.destination.id)
  const sortRoutesByDestination = (a, b) => a.destination.name.charAt(0) < b.destination.name.charAt(0)

  return (<div>
    { origins.map(origin => {
      const originSystem = routes.find(byOrigin(origin)).origin
      const routesFromOrigin = routes.filter(byOrigin(origin))
      console.log(routesFromOrigin)
      return (<List key={'category-'+origin}>
        <Route render={({history}) => (
          <ListItem button onClick={() => {
            history.push(`/home/nav/${originSystem.name}`)
          }} >
            <SystemSecAvatarBig system={originSystem}/>
            <ListItemText
              primary={originSystem.name}
              secondary={originSystem.sec.toFixed(2)}
            />
          </ListItem>
        )} />

        { routesFromOrigin
          .filter(route => (
            showFavoriteRoutes
            ? true
            : !leadsToFavorite(route)
          ))
          .sort(sortRoutesByDestination)
          .map(route => {
            const { origin, destination } = route
            const { jumps } = route[showShortestRoutes ? 'shortest' : 'safest']

            return (<Route key={origin.id + '-' + destination.id} render={({history}) => (
              <ListItem
                button
                onClick={() => {
                  history.push(`/home/nav/${origin.name}/${destination.name}`)
                }}
              >
                <Avatar>
                  {jumps}
                </Avatar>
                <ListItemText
                  primary={destination.name}
                  secondary={ <span> <SystemSecAvatar system={destination} /> {destination.sec.toFixed(2)} </span> }
                />
              </ListItem>
            )} />)
        }) }
      </List>)
    }) }
  </div>)
}

export const RoutesHistoryListItems = props => {
  const {
    routes,
    showShortestRoutes,
    kSpace,
  } = props

  console.log(props)
  console.log(kSpace)

  const categories = kSpace.reduce((memo, {name}) => (
    memo.find(c => c === name.charAt(0).toUpperCase())
    ? memo
    : memo.concat(name.charAt(0).toUpperCase())
  ), []).sort()

  console.log(categories)

  const routesByCategory = categories.reduce((memo, category) => {
    memo[category] = routes.filter(({origin}) => {
      return category === origin.name.charAt(0).toUpperCase()
    })
    return memo
  }, {})
  console.log(routesByCategory)

  return ( <div>
    { categories.map(category => {
      return (<div key={'category-group-'+category}>
        <KSpaceSubHeader letter={category} />
        <KSpaceRoutes {...props} routes={routesByCategory[category]} />
      </div>)
    }) }
  </div>)
}

export const WormholeHistoryListItems = props => {
  const { jSpace } = props
  const whClasses = '1 2 3 4 5 6 13'.split(' ').map(c => 'C' + c)

  return (<div>
    { jSpace.map(j => {
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

        <SystemSecAvatarBig system={system} />

        <ListItemText
          primary={system.name}
          secondary={ system.sec.toFixed(2) }
        />
      </ListItem>)
    })}
  </div>)
}
