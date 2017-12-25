import React from 'react'
import { ListItem, ListItemText } from 'material-ui/List'
import { SystemSecAvatarBig } from '../SystemSecAvatar'
import RouteMenu from './RouteMenu'

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
