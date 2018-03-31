import React from 'react'
import { Route } from 'react-router-dom'
import {
  Avatar,
  Typography
} from 'mui'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from 'mui/List'

import { FavoriteEnabled } from 'App/components/Icons'

import { SystemSecAvatar, SystemSecAvatarBig } from 'App/components/SystemSecAvatar'

import ListItemButtonLink from 'App/components/ListItemButtonLink'

import MoreMenu from './MoreMenu'

export const OriginCard = ({system, favorites}) => {
  const isFavorite = favorites.find(({id}) => system.id === id)

  return (
    <List style={{ flexShrink: 1 }}>
      <ListSubheader style={{padding: 0}} component="div">
        <ListItem style={{
          border: '1px solid #eee',
          maxHeight: 66
        }}>
          <ListItemIcon>
            <SystemSecAvatarBig
              thin={true}
              system={system}
              label={ system.wh
              ? system.jClass
              : system.sec.toFixed(2)
            } />
          </ListItemIcon>


          <ListItemText
            primary={system.name}
            secondary={ isFavorite && (
              <FavoriteEnabled style={{width: '1em', height: '1em'}}/>
            ) }
          />

        </ListItem>
      </ListSubheader>

      <ListItemButtonLink
        href={`http://evemaps.dotlan.net/system/${system.name}`}
        icon="dotlan"
        primary="DOTLAN"
      />

      <ListItemButtonLink
        href={`https://zkillboard.com/system/${system.id}/`}
        icon="zkill"
        primary="ZKILL"
      />

      <Route exact path="/home/nav/:origin" render={() => (
        <MoreMenu system={system} />
      ) } />

      <ListItem style={{display: 'flex'}} />
    </List>
  )
}
