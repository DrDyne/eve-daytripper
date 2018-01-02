import React from 'react'
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from 'material-ui'
import { Link } from 'react-router-dom'
import { whEffectValues } from 'App/api/utils'
import { SystemSecAvatar } from '../../SystemSecAvatar'

import List, { ListItem, ListItemText } from 'material-ui/List'
export const OriginCard = ({system}) => (
  <List style={{ flexShrink: 1 }}>
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

    <ListItem
      button
      component={Link}
      to={`http://evemaps.dotlan.net/system/${system.name}`}
      target="_blank"
      style={{justifyContent: 'center'}}
    >
      <Typography type="caption"> DOTLAN </Typography>
    </ListItem>

    <ListItem
      button
      component={Link}
      to={`https://zkillboard.com/system/${system.id}/`} target="_blank"
      target="_blank"
      style={{justifyContent: 'center'}}
    >
      <Typography type="caption"> ZKILL </Typography>
    </ListItem>

  </List>
)
