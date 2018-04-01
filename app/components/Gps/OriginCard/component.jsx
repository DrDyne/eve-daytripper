import React from 'react'
import { Route, Switch } from 'react-router-dom'
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

  const SystemHeader = ({onClick}) => (
    <ListItem
      button={!!onClick}
      onClick={onClick}
      style={{
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
  )

  const DotlanButton = () => (
    <ListItemButtonLink
      href={`http://evemaps.dotlan.net/system/${system.name}`}
      icon="dotlan"
      primary="DOTLAN"
    />
  )

  const ZkillButton = () => (
    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      icon="zkill"
      primary="ZKILL"
    />
  )

  return (
    <List style={{ flexShrink: 1 }}>
      <ListSubheader style={{padding: 0}} component="div">

        <Switch>
          <Route path="/home/nav/:origin/:destination" render={({history, match}) => (
            <SystemHeader onClick={() => history.push(`/home/nav/${system.name}`) } />
          )} />

          <Route path="/home/nav/:origin" render={() => <SystemHeader />} />
        </Switch>

      </ListSubheader>

      <DotlanButton />

      <ZkillButton />

      <Route exact path="/home/nav/:origin" render={() => (
        <MoreMenu system={system} />
      ) } />

      <ListItem style={{display: 'flex'}} />
    </List>
  )
}
