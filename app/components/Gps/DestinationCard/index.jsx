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
      target="_blank"
      content={ <Typography type="caption"> DOTLAN </Typography> }
    />

    <ListItemButtonLink
      href={`https://zkillboard.com/system/${system.id}/`}
      target="_blank"
      content={ <Typography type="caption"> ZKILL </Typography> }
    />
  </List>
)

//export const DestinationCard = ({system}) => (<Card elevation={0} raised={false}>
//  <CardContent style={{
//    paddingTop: 0,
//    paddingBottom: 0,
//  }} >
//    <div style={{
//      display: 'flex',
//      flexDirection: 'row',
//      justifyContent: 'space-between',
//    }}>
//      <div style={{
//        display: 'flex',
//        flexDirection: 'column',
//      }}>
//        <div style={{
//          display: 'flex',
//        }} >
//          <Typography type="headline" style={{marginRight: 10}}>
//            {system.name}
//          </Typography>
//        </div>
//        <Typography type="caption" style={{marginRight: 10}}>
//          <SystemSecAvatar system={system} />
//          {system.sec.toFixed(2)}
//        </Typography>
//      </div>
//    </div>
//  </CardContent>
//</Card>)
