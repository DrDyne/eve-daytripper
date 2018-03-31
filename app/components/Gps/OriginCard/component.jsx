import React from 'react'
import { Route } from 'react-router-dom'
import {
  Typography
} from 'mui'
import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'mui/List'

import { SystemSecAvatar } from 'App/components/SystemSecAvatar'
import ListItemButtonLink from 'App/components/ListItemButtonLink'

import MoreMenu from './MoreMenu'

export const OriginCard = ({system}) => (
  <List style={{ flexShrink: 1 }}>
    <ListSubheader style={{background: 'white', padding: 0}} component="div">
      <ListItem style={{
        border: '1px solid #eee'
      }}>
        <ListItemText
          primary={system.name}
          secondary={(
            <span>
              <SystemSecAvatar system={system} />
              { system.wh
              ? system.jClass
              : system.sec.toFixed(2)
              }
            </span>
          )}
          style={{
            textAlign: 'center',
            padding: 0
          }}
        />
      </ListItem>
    </ListSubheader>

    <ListItemButtonLink
      href={`http://evemaps.dotlan.net/system/${system.name}`}
      target="_blank"
      content={ <Typography type="caption"> DOTLAN </Typography> }
    />

    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      target="_blank"
      content={ <Typography type="caption"> ZKILL </Typography> }
    />

    <Route exact path="/home/nav/:origin" render={() => (
      <MoreMenu system={system} />
    ) } />

    <ListItem style={{display: 'flex'}} />
  </List>
)
