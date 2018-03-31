import React from 'react'
import { Route } from 'react-router-dom'
import { ListItem, ListItemText } from 'material-ui/List'
import { SystemSecAvatarBig } from '../SystemSecAvatar'
import RouteMenu from './RouteMenu'

export const makeLabel = system => {
  if ( !system.wh ) return system.sec.toFixed(2)

  const statics = system.statics.map(({leadsTo}) => leadsTo).join(', ')
  if ( !system.effectName ) return statics
  return statics + ' / ' + system.effectName
}

export const FavoriteHistoryListItems = ({favorites}) => (
  <div>
    { favorites.map(system => {
      const { id, name, sec } = system
      return (
        <Route key={id} render={({history}) => (
          <ListItem
            button
            key={`route-history-favorite-${id}`}
            style={{
              textDecoration: 'none'
            }}
            onClick={() => {
              history.push(`/home/nav/${name}`)
            }}
          >

            <SystemSecAvatarBig
              system={system}
              thin={true}
              label={system.wh && system.jClass}
            />

            <ListItemText
              primary={name}
              secondary={ makeLabel(system) }
            />
          </ListItem>
        )} />
      )
    }) }
  </div>
)

export default FavoriteHistoryListItems
