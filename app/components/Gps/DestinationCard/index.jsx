import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from 'material-ui'
import { SystemSecAvatar } from 'App/components/SystemSecAvatar'
import ListItemButtonLink from 'App/components/ListItemButtonLink'

import List, { ListItem, ListItemText } from 'material-ui/List'
export const DestinationCard = ({system}) => (
  <List>
    <ListItem style={{ border: '1px solid #eee' }}>
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

    <ListItemButtonLink
      href={`http://evemaps.dotlan.net/system/${system.name}`}
      primary="DOTLAN"
      icon="dotlan"
    />

    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      primary="ZKILL"
      icon="zkill"
    />
  </List>
)
